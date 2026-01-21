# Sidebar Feature

A responsive sidebar system with desktop and mobile variants using compound component patterns.

## Structure

```
sidebar/
├── index.ts                  # Barrel exports
├── Sidebar.tsx               # Core navigation component
├── DesktopSidebar.tsx        # Desktop variant (always visible)
├── MobileSidebar.tsx         # Mobile variant (slide-in drawer)
├── sidebar.types.ts          # All TypeScript types
└── storeMobileSidebar.ts     # Zustand store for mobile state
```

## Usage

### Desktop Sidebar

```tsx
import {
  DesktopSidebar,
  DesktopSidebarHeader,
  DesktopSidebarContent,
} from "@/features/sidebar";

<DesktopSidebar>
  <DesktopSidebarHeader>
    <AppLogo />
  </DesktopSidebarHeader>
  <DesktopSidebarContent sections={sections} />
</DesktopSidebar>;
```

### Mobile Sidebar

```tsx
import {
  MobileSidebar,
  MobileSidebarHeader,
  MobileSidebarContent,
  MobileSidebarToggler,
  MobileSidebarOverlay,
} from "@/features/sidebar";

<>
  <MobileSidebarOverlay />
  <MobileSidebar>
    <MobileSidebarHeader>
      <AppLogo />
      <MobileSidebarToggler>
        <X size={20} />
      </MobileSidebarToggler>
    </MobileSidebarHeader>
    <MobileSidebarContent sections={sections} />
  </MobileSidebar>

  {/* Toggler elsewhere in UI */}
  <MobileSidebarToggler>
    <Menu size={20} />
  </MobileSidebarToggler>
</>;
```

## Section Data Structure

```ts
type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

type SidebarItem = {
  icon: LucideIcon;
  label: string;
  href: string;
};
```

### Example

```ts
// src/app/constants/sidebar.const.ts
export const SidebarPlatformSection = {
  title: "Platform",
  items: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FolderOpen, label: "Projects", href: "/projects" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
  ],
};
```

## Components

| Component               | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `Sidebar`               | Core nav component rendering sections and items |
| `DesktopSidebar`        | Container for desktop (hidden on mobile)        |
| `DesktopSidebarHeader`  | Header slot for logo/branding                   |
| `DesktopSidebarContent` | Renders navigation sections                     |
| `MobileSidebar`         | Slide-in drawer container                       |
| `MobileSidebarHeader`   | Header with close button slot                   |
| `MobileSidebarContent`  | Renders sections, auto-closes on click          |
| `MobileSidebarToggler`  | Button that toggles sidebar open/closed         |
| `MobileSidebarOverlay`  | Backdrop overlay, closes sidebar on click       |

## State Management

Mobile sidebar uses Zustand for open/close state:

```ts
// storeMobileSidebar.ts
useMobileSidebarStore.getState().toggle(); // Toggle open/close
useMobileSidebarStore.getState().close(); // Close sidebar
```

## Active State

Navigation items automatically highlight based on the current route using `useLocation()` from React Router.
