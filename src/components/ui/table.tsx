import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

type TableProps = React.ComponentProps<"table">;
type TableHeaderProps = React.ComponentProps<"thead">;
type TableBodyProps = React.ComponentProps<"tbody">;
type TableRowProps = React.ComponentProps<"tr"> &
  VariantProps<typeof tableRowVariants>;
type TableCellProps = React.ComponentProps<"td">;
type TableHeadProps = React.ComponentProps<"th">;
type TableCellVariantProps = VariantProps<typeof tableCellVariants>;

const tableRowVariants = cva("", {
  variants: {
    variant: {
      header: "bg-muted/50",
      body: "bg-transparent hover:bg-muted/30 transition-colors",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const tableCellVariants = cva("p-4", {
  variants: {
    variant: {
      default: "text-sm text-muted-foreground",
    },
    capitalize: {
      true: "capitalize",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    capitalize: false,
  },
});

export function Table({ className, ...props }: TableProps) {
  return (
    <table className={cn("w-full overflow-hidden", className)} {...props} />
  );
}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn("border-0", className)} {...props} />;
}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn("p-4 text-left text-sm font-semibold", className)}
      {...props}
    />
  );
}

export function TableRow({ className, variant, ...props }: TableRowProps) {
  return (
    <tr className={cn(tableRowVariants({ variant }), className)} {...props} />
  );
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={cn("", className)} {...props} />;
}

export function TableCell({
  className,
  variant,
  capitalize,
  ...props
}: TableCellProps & TableCellVariantProps) {
  return (
    <td
      className={cn(tableCellVariants({ variant, capitalize }), className)}
      {...props}
    />
  );
}
