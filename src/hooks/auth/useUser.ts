import type { User } from "@/types/auth.types";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useSessionQueryOptions } from "@/features/auth/hooks/useSession";

export const useUser = () => {
    const { data: session } = useQuery(useSessionQueryOptions());
    if (!session?.user) return null;
    return transformUser(session.user);
};

export const useSuspenseUser = () => {
    const { data: session } = useSuspenseQuery(
        useSessionQueryOptions(),
    );
    if (!session?.user) return null;
    return transformUser(session.user);
};

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
