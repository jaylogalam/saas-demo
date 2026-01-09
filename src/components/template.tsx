import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/tailwindMerge";

// Define the props for the Text component
type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants>;

// Create the Text component with variant support
const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  )
);
Text.displayName = "Text";

export default Text;

// Define the text variants using class-variance-authority
const textVariants = cva("font-sans", {
  variants: {
    variant: {
      hero: "text-6xl font-bold",
      title: "text-4xl font-semibold",
      subtitle: "text-2xl",
      body: "text-lg",
      highlight: "text-lg font-semibold",
      caption: "text-sm text-gray-500",
    },
  },
});
