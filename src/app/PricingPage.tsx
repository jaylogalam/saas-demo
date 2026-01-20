import {
  PricingCard,
  PricingCardSkeleton,
} from "@/features/subscription/components/PricingCard";
import { useSubscriptionPlans } from "@/features/subscription/hooks";
import { useSubscriptionStore } from "@/features/subscription/store/subscriptionStore";
import { BillingToggle } from "@/features/subscription/components/BillingToggle";
import { useUserSubscription } from "@/features/subscription/hooks";

export default function PricingPage() {
  const { billingInterval } = useSubscriptionStore();

  const { subscriptionPlans, subscriptionPlansStatus } = useSubscriptionPlans();
  const { userSubscriptionStatus } = useUserSubscription();

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
      <BillingToggle
        isLoading={
          subscriptionPlansStatus === "pending" ||
          userSubscriptionStatus === "pending"
        }
      />

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 sm:px-6 pb-20">
        {subscriptionPlansStatus === "pending" ||
        userSubscriptionStatus === "pending" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-start justify-items-center">
            <PricingCardSkeleton />
            <PricingCardSkeleton />
            <PricingCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-start justify-items-center">
            {subscriptionPlans?.map((plan) => (
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
