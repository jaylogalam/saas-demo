import type { LucideIcon } from "lucide-react";

/*
    Sidebar Types
*/

// Sidebar Props
export type SidebarProps = {
    sections: SidebarSection[];
} & React.ComponentPropsWithoutRef<"nav">;

// Sidebar Container Props
export type SidebarContainerProps = React.ComponentPropsWithoutRef<"nav">;

// Sidebar Section Props
export type SidebarSectionProps = {
    section: SidebarSection;
} & React.ComponentPropsWithoutRef<"div">;

// Sidebar Item Props
export type SidebarItemProps = {
    link: any;
} & React.ComponentPropsWithoutRef<"button">;

// Sidebar Section
export type SidebarSection = {
    title: string;
    items: SidebarItem[];
};

// Sidebar Item
export type SidebarItem = {
    icon: LucideIcon;
    label: string;
    href: string;
};

/*
    Desktop Sidebar Types
*/

// Desktop Sidebar Header Props
export type DesktopSidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>;

// Desktop Sidebar Content Props
export type DesktopSidebarContentProps = {
    sections: SidebarSection[];
} & React.HTMLAttributes<HTMLDivElement>;

// Desktop Sidebar Props - requires Header and Content as children
export type DesktopSidebarProps = {
    children: [
        React.ReactElement<DesktopSidebarHeaderProps>,
        React.ReactElement<DesktopSidebarContentProps>,
    ];
} & Omit<React.ComponentPropsWithoutRef<"aside">, "children">;

/*
    Mobile Sidebar Types
*/

// Mobile Sidebar Header Props
export type MobileSidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>;

// Mobile Sidebar Content Props
export type MobileSidebarContentProps = {
    sections: SidebarSection[];
} & React.HTMLAttributes<HTMLDivElement>;

// Mobile Sidebar Props - requires Header and Content as children
export type MobileSidebarProps = {
    children: [
        React.ReactElement<MobileSidebarHeaderProps>,
        React.ReactElement<MobileSidebarContentProps>,
    ];
} & Omit<React.ComponentPropsWithoutRef<"aside">, "children">;

// Mobile Sidebar Toggler Props
export type MobileSidebarTogglerProps = React.HTMLAttributes<HTMLButtonElement>;

// Mobile Sidebar Overlay Props
export type MobileSidebarOverlayProps = React.HTMLAttributes<HTMLDivElement>;
