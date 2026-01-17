import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import type { ProrationPreview } from "@/types/subscription.types";

/**
 * Handle subscription plan changes (upgrades/downgrades)
 */
export function useSubscriptionUpdate() {
    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Preview the proration for a plan change
     */
    const previewChange = async (
        subscriptionId: string,
        newPriceId: string,
    ): Promise<ProrationPreview | null> => {
        setError(null);

        try {
            console.log("[useSubscriptionUpdate] Calling preview with:", {
                subscriptionId,
                newPriceId,
            });

            const { data, error: fnError } = await supabase.functions.invoke(
                "update-subscription",
                {
                    body: {
                        subscriptionId,
                        newPriceId,
                        preview: true,
                    },
                },
            );

            console.log("[useSubscriptionUpdate] Preview response:", {
                data,
                fnError,
            });

            if (fnError) throw new Error(fnError.message);
            if (data?.error) throw new Error(data.error);

            return data?.preview as ProrationPreview;
        } catch (err) {
            console.error("[useSubscriptionUpdate] Preview error:", err);
            const message = err instanceof Error
                ? err.message
                : "Failed to preview changes";
            setError(message);
            return null;
        }
    };

    /**
     * Execute the subscription plan change
     */
    const confirmChange = async (
        subscriptionId: string,
        newPriceId: string,
    ): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error: fnError } = await supabase.functions.invoke(
                "update-subscription",
                {
                    body: {
                        subscriptionId,
                        newPriceId,
                        preview: false,
                    },
                },
            );

            if (fnError) throw new Error(fnError.message);
            if (data.error) throw new Error(data.error);

            // Invalidate subscription queries to refetch updated data
            await queryClient.invalidateQueries({
                queryKey: queryKeys.subscription.all,
            });

            return true;
        } catch (err) {
            const message = err instanceof Error
                ? err.message
                : "Failed to update subscription";
            setError(message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Cancel the subscription
     */
    const cancelSubscription = async (
        subscriptionId: string,
        cancelImmediately = false,
    ): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            console.log("[useSubscriptionUpdate] Cancelling subscription:", {
                subscriptionId,
                cancelImmediately,
            });

            const { data, error: fnError } = await supabase.functions.invoke(
                "cancel-subscription",
                {
                    body: {
                        subscriptionId,
                        cancelImmediately,
                    },
                },
            );

            console.log("[useSubscriptionUpdate] Cancel response:", {
                data,
                fnError,
            });

            if (fnError) throw new Error(fnError.message);
            if (data?.error) throw new Error(data.error);

            // Invalidate subscription queries to refetch updated data
            await queryClient.invalidateQueries({
                queryKey: queryKeys.subscription.all,
            });

            return true;
        } catch (err) {
            console.error("[useSubscriptionUpdate] Cancel error:", err);
            const message = err instanceof Error
                ? err.message
                : "Failed to cancel subscription";
            setError(message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        previewChange,
        confirmChange,
        cancelSubscription,
        isLoading,
        error,
        clearError: () => setError(null),
    };
}
