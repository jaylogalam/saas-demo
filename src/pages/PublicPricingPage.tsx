import { create } from "zustand";
import {
  PricingCard,
  PricingCardSkeleton,
} from "@/components/cards/PricingCard";
import { useSubscriptionPlansList } from "@/hooks/useSubscriptionPlans";
import { BillingToggleButton } from "@/components/buttons/BillingToggleButton";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Page } from "@/components/ui/page";
import { useUser } from "@/hooks/useUser";

type SubscriptionState = {
  billingInterval: "monthly" | "yearly";
  loading: boolean;
  error: string | null;
  setBillingInterval: (interval: "monthly" | "yearly") => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

const useSubscriptionStore = create<SubscriptionState>((set) => ({
  billingInterval: "monthly",
  loading: false,
  error: null,
  setBillingInterval: (interval) => set({ billingInterval: interval }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

function PricingPage() {
  const { data: user } = useUser();

  const { billingInterval } = useSubscriptionStore();

  const { data: subscriptionPlans, status: subscriptionPlansStatus } =
    useSubscriptionPlansList();
  const { isPending } = useUserSubscription(user);

  const filteredPlans = subscriptionPlans?.filter(
    (plan) => plan.interval === billingInterval,
  );

  return (
    <Page variant="public">
      {/* Header Section */}
      <section className="relative w-full overflow-hidden pt-20 pb-12">
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
      <BillingToggleButton
        isLoading={subscriptionPlansStatus === "pending" || isPending}
        billingInterval={billingInterval}
        setBillingInterval={(interval) =>
          useSubscriptionStore.getState().setBillingInterval(interval)
        }
      />

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 sm:px-6 pb-20">
        {subscriptionPlansStatus === "pending" || isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-start justify-items-center">
            <PricingCardSkeleton />
            <PricingCardSkeleton />
            <PricingCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-start justify-items-center">
            {filteredPlans?.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </section>
    </Page>
  );
}

export default PricingPage;
