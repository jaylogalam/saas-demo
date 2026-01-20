import {
    SidebarAdminSection,
    SidebarPlatformSection,
} from "@/app/constants/sidebar.const";
import { useAdmin } from "@/features/admin/hooks";
import { useMemo } from "react";

export const useSidebar = () => {
    const { admin } = useAdmin();
    const sections = useMemo(() => {
        return admin
            ? [SidebarPlatformSection, SidebarAdminSection]
            : [SidebarPlatformSection];
    }, [admin]);

    return sections;
};
