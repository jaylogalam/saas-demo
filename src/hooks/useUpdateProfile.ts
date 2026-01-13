import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/**
 * Hook to update user's display name
 */
export function useUpdateDisplayName() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (fullName: string) => {
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName,
                },
            });
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
        },
    });
}

/**
 * Hook to update user's avatar URL
 */
export function useUpdateAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (avatarUrl: string) => {
            const { error } = await supabase.auth.updateUser({
                data: {
                    avatar_url: avatarUrl,
                },
            });
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
        },
    });
}
