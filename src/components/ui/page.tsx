import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

type PageProps = React.ComponentProps<"div"> &
  VariantProps<typeof pageVariants>;

type PageHeaderProps = {
  title: string;
  description?: string;
};

const pageVariants = cva("", {
  variants: {
    variant: {
      default: "",
      admin: "space-y-6",
      auth: "grid min-h-svh",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Page({ children, className, variant, ...props }: PageProps) {
  return (
    <div className={cn(pageVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
