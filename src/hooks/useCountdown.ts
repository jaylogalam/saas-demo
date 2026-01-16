import { useCallback, useRef, useSyncExternalStore } from "react";

interface CountdownStore {
    countdown: number;
    intervalId: ReturnType<typeof setInterval> | null;
    listeners: Set<() => void>;
    lastResetTrigger: unknown;
}

/**
 * A countdown timer hook using useSyncExternalStore for optimal React 18+ performance
 *
 * @param initialSeconds - The starting countdown value in seconds
 * @param resetTrigger - When this value changes, the countdown resets (useful for success states)
 *
 * @example
 * const { countdown, reset } = useCountdown(60, resendSuccess);
 *
 * return (
 *   <button disabled={countdown > 0} onClick={() => { resend(); reset(); }}>
 *     {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
 *   </button>
 * );
 */
export function useCountdown(initialSeconds: number, resetTrigger?: unknown) {
    const storeRef = useRef<CountdownStore | null>(null);

    // Initialize store lazily
    if (!storeRef.current) {
        storeRef.current = {
            countdown: initialSeconds,
            intervalId: null,
            listeners: new Set(),
            lastResetTrigger: resetTrigger,
        };
    }

    const store = storeRef.current;

    // Handle reset trigger change during render (React 18+ concurrent mode safe)
    if (resetTrigger && resetTrigger !== store.lastResetTrigger) {
        store.countdown = initialSeconds;
        store.lastResetTrigger = resetTrigger;
    }

    const startTimer = useCallback(() => {
        if (store.intervalId || store.countdown <= 0) return;

        store.intervalId = setInterval(() => {
            store.countdown = Math.max(0, store.countdown - 1);
            store.listeners.forEach((listener) => listener());

            if (store.countdown <= 0 && store.intervalId) {
                clearInterval(store.intervalId);
                store.intervalId = null;
            }
        }, 1000);
    }, [store]);

    const subscribe = useCallback(
        (onStoreChange: () => void) => {
            store.listeners.add(onStoreChange);

            // Start timer if not running and countdown > 0
            if (!store.intervalId && store.countdown > 0) {
                startTimer();
            }

            return () => {
                store.listeners.delete(onStoreChange);
                if (store.listeners.size === 0 && store.intervalId) {
                    clearInterval(store.intervalId);
                    store.intervalId = null;
                }
            };
        },
        [store, startTimer],
    );

    const getSnapshot = useCallback(() => store.countdown, [store]);

    const countdown = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

    const reset = useCallback(() => {
        store.countdown = initialSeconds;
        store.listeners.forEach((listener) => listener());

        // Restart timer if stopped
        if (!store.intervalId) {
            startTimer();
        }
    }, [store, initialSeconds, startTimer]);

    return { countdown, reset, isComplete: countdown <= 0 };
}
