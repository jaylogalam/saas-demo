/**
 * Centralized query key definitions
 * Ensures consistency across all React Query hooks
 */
export const queryKeys = {
    // Auth-related keys
    auth: {
        all: ["auth"] as const,
        session: () => [...queryKeys.auth.all, "session"] as const,
        user: () => [...queryKeys.auth.all, "user"] as const,
    },

    // Subscription-related keys
    subscription: {
        all: ["subscription"] as const,
        plans: () => [...queryKeys.subscription.all, "plans"] as const,
        plan: (planId: string) =>
            [...queryKeys.subscription.all, "plan", planId] as const,
        user: (userId: string | undefined) =>
            ["user-subscription", userId] as const,
        prorationPreview: (subscriptionId: string, priceId: string) =>
            [
                ...queryKeys.subscription.all,
                "proration",
                subscriptionId,
                priceId,
            ] as const,
    },
} as const;

// Type helper for query keys
export type QueryKeys = typeof queryKeys;
