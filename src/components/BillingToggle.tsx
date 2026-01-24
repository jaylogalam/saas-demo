import { Skeleton } from "@/components/ui/skeleton";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { cn } from "@/utils/cn";

type BillingToggleProps = {
  isLoading?: boolean;
};

export function BillingToggle({ isLoading = false }: BillingToggleProps) {
  const { billingInterval, setBillingInterval } = useSubscriptionStore();

  if (isLoading) return <BillingToggleSkeleton />;

  return (
    <div className="flex flex-col items-center gap-4 mb-12 mt-8">
      <div className="relative flex items-center gap-0 p-1.5 bg-muted/50 border border-border rounded-full">
        <BillingToggleButton
          name="Monthly"
          onClick={() => setBillingInterval("monthly")}
          disabled={billingInterval === "monthly"}
        />

        <BillingToggleButton
          name="Yearly"
          onClick={() => setBillingInterval("yearly")}
          disabled={billingInterval === "yearly"}
        />

        <div
          className={cn(
            "absolute top-1.5 h-[calc(100%-12px)] w-[100px] bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg transition-all duration-300 ease-out",
            billingInterval === "yearly"
              ? "left-[calc(6px+100px)]"
              : "left-1.5",
          )}
        />
      </div>
    </div>
  );
}

function BillingToggleSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 mb-12 mt-8">
      <div className="relative flex items-center gap-0 p-1.5 bg-muted/50 border border-border rounded-full">
        <Skeleton className="h-[52px] w-[200px] rounded-full" />
      </div>
    </div>
  );
}

function BillingToggleButton({
  name,
  disabled = false,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "relative z-10 w-[100px] py-2.5 text-sm font-medium text-center rounded-full transition-all duration-300",
        disabled
          ? "text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
      {...props}
    >
      <span>{name}</span>
    </button>
  );
}
