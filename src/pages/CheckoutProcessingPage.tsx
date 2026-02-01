import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useSubscriptionPlansList } from "@/hooks/useSubscriptionPlans";
import { UserSubscriptionServices } from "@/services/user-subscription.services";
import { queryKeys } from "@/lib/queryKeys";

// TODO: Fix UI design
export default function CheckoutProcessingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan");

  const { data: user } = useUser();
  const { data: plans } = useSubscriptionPlansList();

  // Poll for subscription with refetchInterval
  const { data: userSubscription } = useQuery({
    queryKey: queryKeys.subscription.user(user?.email),
    queryFn: () => UserSubscriptionServices.getUserSubscriptions(user),
    refetchInterval: 3000,
    enabled: !!user,
  });

  const plan = plans?.find((p) => p.id === planId);

  // Redirect when subscription is detected
  useEffect(() => {
    if (userSubscription && planId) {
      navigate(`/checkout/success?plan=${planId}`, { replace: true });
    }
  }, [userSubscription, planId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
          <div className="relative rounded-full bg-primary/10 p-6">
            <Loader2 className="size-12 text-primary animate-spin" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Processing your payment
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base max-w-sm mb-4">
          Complete your purchase in the Stripe checkout window.
          {plan && (
            <>
              {" "}
              You're subscribing to{" "}
              <span className="text-primary font-medium">{plan.name}</span>.
            </>
          )}
        </p>

        <p className="text-xs text-muted-foreground/60">
          This page will update automatically once payment is complete.
        </p>
      </div>
    </div>
  );
}
