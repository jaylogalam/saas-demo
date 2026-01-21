export type NavbarProps = {
    children: React.ReactNode;
    className?: string;
};

export type NavbarLinkListProps = {
    children: React.ReactElement<NavbarLinkItemProps>[];
    className?: string;
};

export type NavbarLinkItemProps = {
    children: React.ReactNode;
    to: string;
    className?: string;
};
