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
        list: () => [...queryKeys.auth.all, "list"] as const,
        role: () => [...queryKeys.auth.all, "role"] as const,
    },

    // Subscription-related keys
    subscription: {
        all: ["subscription"] as const,
        plans: (productId?: string) =>
            [...queryKeys.subscription.all, "plans", productId] as const,
        plan: (productId: string) =>
            [...queryKeys.subscription.all, "plan", productId] as const,
        user: (userId: string | undefined) =>
            ["user-subscription", userId] as const,
        list: () => [...queryKeys.subscription.all, "list"] as const,
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
