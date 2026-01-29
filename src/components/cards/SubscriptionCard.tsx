import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatUnixTimestamp } from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { ArrowUpRight, Rocket } from "lucide-react";

export function SubscriptionCard() {
  const { data: user } = useUser();
  const { data: userSubscription } = useUserSubscription(user);

  if (!userSubscription) return <NoSubscriptionCard />;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            Current Plan
          </CardTitle>
        </div>
        <CardDescription>Your subscription details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-2xl font-bold">{userSubscription.plan.name}</p>
          {userSubscription.plan.interval && (
            <p className="text-sm text-muted-foreground">
              Billed{" "}
              {userSubscription.plan.interval === "monthly"
                ? "monthly"
                : "yearly"}
            </p>
          )}
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {userSubscription.cancelAtPeriodEnd
              ? "Expires on"
              : "Next billing date"}
          </span>
          <span className="font-medium">
            {formatUnixTimestamp(userSubscription.currentPeriodEnd)}
          </span>
        </div>
        {userSubscription.status === "active" ||
          (userSubscription.status === "trialing" &&
            !userSubscription.cancelAtPeriodEnd && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  Cancel
                </Button>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to="/pricing">
                    Change Plan
                    <ArrowUpRight className="ml-1 size-3 sm:size-4" />
                  </Link>
                </Button>
              </div>
            ))}
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" disabled>
          Manage Subscription
          <ArrowUpRight className="ml-1 size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export function NoSubscriptionCard() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 rounded-full bg-primary/10 p-4">
        <Rocket className="size-8 text-primary" />
      </div>
      <h2 className="mb-2 text-xl sm:text-2xl font-semibold tracking-tight">
        No Active Subscription
      </h2>
      <p className="mb-6 max-w-sm text-sm sm:text-base text-muted-foreground">
        Unlock premium features and take your experience to the next level.
        Choose a plan that works for you.
      </p>
      <Button asChild size="lg">
        <Link to="/pricing">
          View Plans
          <ArrowUpRight className="ml-1 size-4" />
        </Link>
      </Button>
    </div>
  );
}
