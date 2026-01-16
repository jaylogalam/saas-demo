import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";

// ============================================================================
// Types
// ============================================================================

interface UserMetadataUpdate {
    full_name?: string;
    avatar_url?: string;
}

// ============================================================================
// Core Hook - Single Responsibility: Update user metadata
// ============================================================================

/**
 * Base hook for updating user metadata
 * Provides a flexible way to update any user metadata field
 */
export function useUpdateUserMetadata() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UserMetadataUpdate) => {
            const { error } = await supabase.auth.updateUser({ data });
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.session(),
            });
        },
    });
}

// ============================================================================
// Convenience Hooks - Built on top of base hook for specific use cases
// ============================================================================

/**
 * Hook to update user's display name
 * @example
 * const { mutate } = useUpdateDisplayName();
 * mutate("John Doe");
 */
export function useUpdateDisplayName() {
    const mutation = useUpdateUserMetadata();

    return {
        ...mutation,
        mutate: (fullName: string) => mutation.mutate({ full_name: fullName }),
        mutateAsync: (fullName: string) =>
            mutation.mutateAsync({ full_name: fullName }),
    };
}

/**
 * Hook to update user's avatar URL
 * @example
 * const { mutate } = useUpdateAvatar();
 * mutate("https://example.com/avatar.jpg");
 */
export function useUpdateAvatar() {
    const mutation = useUpdateUserMetadata();

    return {
        ...mutation,
        mutate: (avatarUrl: string) =>
            mutation.mutate({ avatar_url: avatarUrl }),
        mutateAsync: (avatarUrl: string) =>
            mutation.mutateAsync({ avatar_url: avatarUrl }),
    };
}
