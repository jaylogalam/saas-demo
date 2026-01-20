import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

export interface SidebarSection {
    title: string;
    items: SidebarItem[];
}
