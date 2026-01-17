import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";

/**
 * Sign out current user
 * Automatically navigates to home page on success
 */
export function useSignOut() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: handleLogout } = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },
        onSuccess: () => {
            navigate("/");
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.session(),
            });
        },
    });

    return { handleLogout };
}
