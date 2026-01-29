---
description: Guide for creating new UI components (shadcn/ui primitives or custom)
---

# Create UI Component

Follow this guide to add new UI components to the project.

## 1. Determine Component Type

Is this a standard UI primitive (e.g., Button, Dialog, Select) or a custom feature-specific component?

- **Standard Primitive**: One of the components available in [shadcn/ui](https://ui.shadcn.com/docs/components/accordion).
- **Custom Component**: A unique component built for this application.

## 2. Standard Primitives (shadcn/ui)

If the component is available in shadcn/ui library, use the CLI to add it.

```bash
npx shadcn@latest add [component-name]
```

Example:

```bash
npx shadcn@latest add accordion
```

This will automatically install the component to `src/components/ui`.

## 3. Custom Components

If you are building a custom component, follow these rules:

1.  **Location**: Create the component in `src/components`.
    - If it's a generic UI element not in shadcn, consider putting it in `src/components/ui` or just `src/components`.
    - Use PascalCase for filenames: `src/components/MyCustomComponent.tsx`.

2.  **Structure**:

    ```tsx
    import * as React from "react";
    import { cn } from "@/utils/cn";

    export interface MyCustomComponentProps extends React.HTMLAttributes<HTMLDivElement> {
      // Add custom props here
      variant?: "default" | "outline";
    }

    export function MyCustomComponent({
      className,
      variant = "default",
      ...props
    }: MyCustomComponentProps) {
      return (
        <div
          className={cn(
            "flex items-center p-4", // Base styles
            variant === "outline" && "border border-gray-200", // Conditional styles
            className, // Allow overriding via className prop
          )}
          {...props}
        >
          {props.children}
        </div>
      );
    }
    ```

3.  **Key Practices**:
    - **Always** use `cn()` (from `@/utils/cn`) to merge class names. This allows parent components to override styles safely.
    - **Export** the component function and its Props interface.
    - **Forward Refs** if the component is expected to behave like a standard HTML element and needs ref access (use `React.forwardRef`).

## 4. Registering (Optional)

If the component is intended to be a shared UI primitive, ensure it matches the style of existing components in `src/components/ui`.
