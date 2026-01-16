import { useAuthStore } from "@/store/authStore";

interface UserInfo {
    name: string;
    email: string;
    avatarUrl?: string;
}

/**
 * Hook to extract user info from auth state
 * Centralizes the user metadata extraction logic used across navbars and layouts
 */
export function useUserInfo() {
    const { user, loading } = useAuthStore();

    const userInfo: UserInfo | undefined = user
        ? {
            name: user.user_metadata?.full_name || user.email?.split("@")[0] ||
                "User",
            email: user.email || "",
            avatarUrl: user.user_metadata?.avatar_url,
        }
        : undefined;

    return { user, userInfo, loading };
}
