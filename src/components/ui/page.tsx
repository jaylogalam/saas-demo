import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

type PageProps = React.ComponentProps<"div"> &
  VariantProps<typeof pageVariants>;

type PageHeaderProps = {
  title: string;
  description?: string;
};

type PageContentProps = {
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<"div">;

const pageVariants = cva("", {
  variants: {
    variant: {
      app: "flex-1 min-h-0 px-12 py-8 space-y-8 overflow-y-auto",
      auth: "grid min-h-svh",
      public:
        "place-items-center place-content-center min-h-[calc(100vh-5rem)]",
    },
  },
  defaultVariants: {
    variant: "app",
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

export function PageContent({
  className,
  children,
  ...props
}: PageContentProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {children}
    </div>
  );
}
