# Navbar Feature

A reusable, composable navigation bar component system for public-facing pages.

## Overview

The Navbar feature provides a flexible navigation component with a sticky header, responsive layout, and composable sub-components for building navigation menus.

## Components

### `Navbar`

The main container component that provides a sticky header with backdrop blur effect.

```tsx
import { Navbar } from "@/features/navbar/Navbar";

<Navbar>{/* Your navbar content */}</Navbar>;
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Content to render inside the navbar |
| `className` | `string` | No | Additional CSS classes |

---

### `NavbarLinkList`

A container for navigation links that displays horizontally on larger screens and hides on mobile.

```tsx
import { NavbarLinkList, NavbarLinkItem } from "@/features/navbar/Navbar";

<NavbarLinkList>
  <NavbarLinkItem to="/pricing">Pricing</NavbarLinkItem>
  <NavbarLinkItem to="/about">About</NavbarLinkItem>
</NavbarLinkList>;
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactElement<NavbarLinkItemProps>[]` | Yes | NavbarLinkItem components |
| `className` | `string` | No | Additional CSS classes |

---

### `NavbarLinkItem`

Individual navigation link component with hover styling.

```tsx
import { NavbarLinkItem } from "@/features/navbar/Navbar";

<NavbarLinkItem to="/pricing">Pricing</NavbarLinkItem>;
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `to` | `string` | Yes | The URL/path the link navigates to |
| `children` | `React.ReactNode` | Yes | Link text content |
| `className` | `string` | No | Additional CSS classes |

## Usage Example

Here's a complete example of implementing the Navbar in a layout:

```tsx
import {
  Navbar,
  NavbarLinkItem,
  NavbarLinkList,
} from "@/features/navbar/Navbar";
import { AppLogo } from "@/components/icons/AppLogo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PublicLayout() {
  return (
    <Navbar>
      <AppLogo />

      <NavbarLinkList>
        <NavbarLinkItem to="/pricing">Pricing</NavbarLinkItem>
        <NavbarLinkItem to="/about">About</NavbarLinkItem>
      </NavbarLinkList>

      <Button asChild>
        <Link to="/login">Log in</Link>
      </Button>
    </Navbar>
  );
}
```

## Styling

The navbar uses the following design patterns:

- **Sticky positioning**: Stays at the top of the viewport on scroll
- **Backdrop blur**: Semi-transparent background with blur effect
- **Responsive**: Link list hidden on mobile (`hidden md:flex`)
- **Container layout**: Centered content with horizontal padding
- **Height**: Fixed 64px (`h-16`) height

## File Structure

```
src/features/navbar/
├── Navbar.tsx          # Component implementations
├── navbar.types.ts     # TypeScript type definitions
└── README.md           # This documentation
```

## Dependencies

- `@/utils/cn` - Class name utility for conditional styling
