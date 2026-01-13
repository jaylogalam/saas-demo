import { PricingCard } from "@/components/PricingCard";
import { useSubscriptionPlans } from "@/hooks/useSubscription";
import { useSubscriptionStore } from "@/store/subscriptionStore";

function BillingToggle() {
  const { billingInterval, setBillingInterval } = useSubscriptionStore();
  const isYearly = billingInterval === "yearly";

  return (
    <div className="flex flex-col items-center gap-4 mb-12 mt-8">
      {/* Toggle Container */}
      <div className="relative flex items-center gap-0 p-1.5 bg-muted/50 border border-border rounded-full">
        {/* Monthly Option */}
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

        {/* Yearly Option */}
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

        {/* Sliding Pill Background */}
        <div
          className={`absolute top-1.5 h-[calc(100%-12px)] bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg transition-all duration-300 ease-out ${
            isYearly
              ? "left-[calc(50%+2px)] w-[calc(50%-8px)]"
              : "left-1.5 w-[calc(50%-8px)]"
          }`}
        />
      </div>
    </div>
  );
}

export default function PricingPage() {
  const { data: plans, isLoading } = useSubscriptionPlans();
  const { billingInterval } = useSubscriptionStore();

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
      <BillingToggle />

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 sm:px-6 pb-20">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse text-muted-foreground">
              Loading plans...
            </div>
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
