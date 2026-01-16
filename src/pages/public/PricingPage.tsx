import {
  PricingCard,
  PricingCardSkeleton,
} from "@/components/cards/PricingCard";
import { useSubscriptionPlans } from "@/hooks/useSubscription";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function PricingPage() {
  const { data: plans, isLoading } = useSubscriptionPlans();
  const { billingInterval, setBillingInterval } = useSubscriptionStore();
  const isYearly = billingInterval === "yearly";

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header Section */}
      <section className="relative overflow-hidden pt-20 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-primary/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground">
              Plan
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground px-4">
            Start building today with our flexible plans. Upgrade or downgrade
            anytime.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      {isLoading ? (
        <div className="flex flex-col items-center gap-4 mb-12 mt-8">
          <Skeleton className="h-[52px] w-[200px] rounded-full" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mb-12 mt-8">
          <div className="relative flex items-center gap-0 p-1.5 bg-muted/50 border border-border rounded-full">
            <button
              onClick={() => setBillingInterval("monthly")}
              className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                !isYearly
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBillingInterval("yearly")}
              className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                isYearly
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
            </button>

            <div
              className={`absolute top-1.5 h-[calc(100%-12px)] bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg transition-all duration-300 ease-out ${
                isYearly
                  ? "left-[calc(50%+2px)] w-[calc(50%-8px)]"
                  : "left-1.5 w-[calc(50%-8px)]"
              }`}
            />
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 sm:px-6 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-start justify-items-center">
            <PricingCardSkeleton />
            <PricingCardSkeleton />
            <PricingCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-start justify-items-center">
            {plans?.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingInterval={billingInterval}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
