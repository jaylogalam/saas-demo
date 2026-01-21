import {
    SidebarAdminSection,
    SidebarPlatformSection,
} from "@/app/constants/sidebar.const";
import { useSuspenseAdmin } from "@/hooks/auth/useAdmin";
import { useMemo } from "react";

export const useSidebar = () => {
    const admin = useSuspenseAdmin();
    const sections = useMemo(() => {
        return admin
            ? [SidebarPlatformSection, SidebarAdminSection]
            : [SidebarPlatformSection];
    }, [admin]);

    return sections;
};
