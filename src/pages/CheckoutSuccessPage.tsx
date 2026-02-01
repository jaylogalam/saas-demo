import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscriptionPlansList } from "@/hooks/useSubscriptionPlans";

// TODO: Fix UI design
export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan");
  const { data: plans } = useSubscriptionPlansList();

  const plan = plans?.find((p) => p.id === planId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl" />
          <div className="relative rounded-full bg-green-500/10 p-6">
            <CheckCircle2 className="size-12 text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          {plan ? (
            <>
              Welcome to <span className="text-primary">{plan.name}</span>!
            </>
          ) : (
            "Payment Successful!"
          )}
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base max-w-sm mb-8">
          Your subscription is now active. You have full access to all premium
          features included in your plan.
        </p>

        <Button asChild size="lg">
          <Link to="/dashboard">
            Go to Dashboard
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
