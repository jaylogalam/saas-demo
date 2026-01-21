import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { User } from "@/types/auth.types";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useSessionQueryOptions } from "@/features/auth/hooks/useSession";
import { useAdminQueryOptions } from "@/features/auth/hooks/useAdmin";

/**
 * Transform Supabase User to our User type
 */
function transformUser(user: SupabaseUser): User {
    return {
        id: user.id,
        email: user.email ?? "",
        name: (user.user_metadata?.name as string) ?? "",
        avatarUrl: (user.user_metadata?.avatar_url as string) ?? "",
        createdAt: user.created_at ?? "",
        emailConfirmedAt: user.email_confirmed_at ?? "",
    };
}

/**
 * Hook to get the current user with loading state
 */
export const useSessionUser = () => {
    const { data: session } = useQuery(useSessionQueryOptions());
    if (!session?.user) return null;
    return transformUser(session.user);
};

/**
 * Hook to get the current user with Suspense support
 * Use this when wrapped in a Suspense boundary
 */
export const useSuspenseSessionUser = () => {
    const { data: session } = useSuspenseQuery(
        useSessionQueryOptions(),
    );
    if (!session?.user) return null;
    return transformUser(session.user);
};

export const useAdmin = () => {
    const user = useSessionUser();
    const { data } = useQuery(useAdminQueryOptions(user?.id || ""));
    return data;
};

export const useSuspenseAdmin = () => {
    const user = useSuspenseSessionUser();
    const { data } = useSuspenseQuery(useAdminQueryOptions(user?.id || ""));
    return data;
};
