import { useState } from "react";
import { Check, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  SubscriptionPlan,
  BillingInterval,
} from "@/types/subscription.types";
import { useCheckout } from "@/hooks/useSubscription";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { PlanChangeModal } from "../modals/PlanChangeModal";

// Feature tooltips for complex features
const featureTooltips: Record<string, string> = {
  "API access": "Full REST API access with rate limits based on your plan",
  "Team collaboration": "Invite team members and manage permissions",
  "Custom integrations": "Connect with Slack, Zapier, and 50+ other tools",
  "SSO & SAML": "Enterprise-grade single sign-on with your identity provider",
  "SLA guarantee": "99.9% uptime guarantee with dedicated support",
};

interface PricingCardProps {
  plan: SubscriptionPlan;
  billingInterval: BillingInterval;
}

export function PricingCard({ plan, billingInterval }: PricingCardProps) {
  const { checkout } = useCheckout();
  const { user } = useAuthStore();
  const { data: userSubscription, refetch } = useUserSubscription();
  const navigate = useNavigate();

  const [showPlanChangeModal, setShowPlanChangeModal] = useState(false);

  const price = plan.price[billingInterval];
  const isYearly = billingInterval === "yearly";
  const monthlyEquivalent = isYearly ? Math.round(price / 12) : price;

  // Check if user is subscribed to this specific plan
  const isSubscribed = !!userSubscription;
  // Compare plan name AND billing interval - yearly plan shows "Change Plan" if subscribed to monthly
  const subscriptionInterval =
    userSubscription?.priceInterval === "month" ? "monthly" : "yearly";
  const isCurrentPlan =
    userSubscription?.productName === plan.name &&
    subscriptionInterval === billingInterval;

  // Get current plan price for the modal
  const currentPlanPrice = userSubscription
    ? (
        userSubscription.subscription.items?.data?.[0]?.price as {
          unit_amount?: number;
        }
      )?.unit_amount ?? 0
    : 0;

  const handleSubscribe = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // If already subscribed, open the plan change modal
    if (isSubscribed && !isCurrentPlan) {
      setShowPlanChangeModal(true);
      return;
    }

    // New subscription - use checkout
    checkout(plan, billingInterval);
  };

  return (
    <>
      <TooltipProvider delayDuration={300}>
        <Card
          className={`relative w-full max-w-sm h-full flex flex-col transition-all duration-300 hover:shadow-xl ${
            plan.highlighted
              ? "border-primary shadow-lg md:scale-105 z-10"
              : "hover:border-primary/50"
          }`}
        >
          {/* Popular Badge */}
          {plan.highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="gap-1.5 px-4 py-1.5 shadow-lg">
                <Sparkles size={12} />
                Most Popular
              </Badge>
            </div>
          )}

          <CardHeader className="text-center pt-6">
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription className="text-sm">
              {plan.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            {/* Price Display */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold tracking-tight">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: plan.currency || "usd",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(isYearly ? price : monthlyEquivalent)}
                </span>
                <span className="text-muted-foreground text-lg">
                  {isYearly ? "/year" : "/mo"}
                </span>
              </div>
              {isYearly && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: plan.currency || "usd",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(monthlyEquivalent)}
                    /mo
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Save 17%
                  </Badge>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Features List */}
            <ul className="space-y-3">
              {plan.features.map((feature, index) => {
                const tooltip = featureTooltips[feature];
                return (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                      {feature}
                      {tooltip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info
                              size={14}
                              className="text-muted-foreground/50 hover:text-muted-foreground cursor-help"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p>{tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardContent>

          <CardFooter className="pt-4 pb-6">
            {isCurrentPlan ? (
              <Button className="w-full" disabled variant="outline">
                Currently Active
              </Button>
            ) : (
              <Button
                className="w-full"
                size="lg"
                variant={plan.highlighted ? "default" : "outline"}
                onClick={handleSubscribe}
              >
                {isSubscribed ? "Change Plan" : "Get Started"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </TooltipProvider>

      {/* Plan Change Modal */}
      {userSubscription && (
        <PlanChangeModal
          open={showPlanChangeModal}
          onOpenChange={setShowPlanChangeModal}
          currentPlan={{
            name: userSubscription.productName,
            price: currentPlanPrice / 100,
            interval: subscriptionInterval,
          }}
          newPlan={plan}
          newInterval={billingInterval}
          subscriptionId={userSubscription.subscription.id}
          newPriceId={plan.priceIds[billingInterval]}
          onSuccess={() => refetch()}
        />
      )}
    </>
  );
}

export function PricingCardSkeleton() {
  return (
    <div className="relative w-full max-w-sm h-full flex flex-col border border-border rounded-xl p-6 bg-card">
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <Skeleton className="h-7 w-24 mx-auto" />
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <Skeleton className="h-12 w-28 mx-auto" />
        <Skeleton className="h-4 w-20 mx-auto mt-2" />
      </div>

      {/* Separator */}
      <Skeleton className="h-px w-full my-6" />

      {/* Features */}
      <div className="flex-1 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Skeleton className="h-11 w-full mt-6 rounded-md" />
    </div>
  );
}
