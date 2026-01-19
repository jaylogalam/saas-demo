import { Skeleton } from "@/components/ui/skeleton";
import { useSubscriptionStore } from "@/features/subscription/store/subscriptionStore";
import { useUserSubscription } from "../hooks";

type BillingToggleProps = {
  status: "pending" | "success" | "error";
};

export function BillingToggle({ status }: BillingToggleProps) {
  const { billingInterval, setBillingInterval } = useSubscriptionStore();
  const { userSubscriptionStatus } = useUserSubscription();

  // Billing Toggle Skeleton
  if (status === "pending" || userSubscriptionStatus === "pending") {
    return (
      <div className="flex flex-col items-center gap-4 mb-12 mt-8">
        <div className="relative flex items-center gap-0 p-1.5 bg-muted/50 border border-border rounded-full">
          <Skeleton className="h-[52px] w-[200px] rounded-full" />
        </div>
      </div>
    );
  }

  // Billing Toggle Component
  return (
    <div className="flex flex-col items-center gap-4 mb-12 mt-8">
      <div className="relative flex items-center gap-0 p-1.5 bg-muted/50 border border-border rounded-full">
        <button
          onClick={() => setBillingInterval("monthly")}
          className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
            billingInterval === "monthly"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => setBillingInterval("yearly")}
          className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
            billingInterval === "yearly"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Yearly
        </button>

        <div
          className={`absolute top-1.5 h-[calc(100%-12px)] bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg transition-all duration-300 ease-out ${
            billingInterval === "yearly"
              ? "left-[calc(50%+2px)] w-[calc(50%-8px)]"
              : "left-1.5 w-[calc(50%-8px)]"
          }`}
        />
      </div>
    </div>
  );
}
