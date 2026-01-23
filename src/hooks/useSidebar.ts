import {
    SidebarAdminSection,
    SidebarPlatformSection,
} from "@/app/constants/sidebar.const";
import { useAdmin } from "@/features/auth/hooks/useAdmin";
import { useUser } from "@/features/auth/hooks/useUser";
import { useMemo } from "react";

export const useSidebar = () => {
    const { data: user } = useUser();
    const { data: admin } = useAdmin(user?.id ?? "");
    const sections = useMemo(() => {
        return admin
            ? [SidebarPlatformSection, SidebarAdminSection]
            : [SidebarPlatformSection];
    }, [admin]);

    return sections;
};
