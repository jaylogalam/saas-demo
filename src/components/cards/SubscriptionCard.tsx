import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatUnixTimestamp } from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import {
  useCancelUserSubscription,
  useUserSubscription,
} from "@/hooks/useUserSubscription";
import { ArrowUpRight, Rocket } from "lucide-react";
import { Separator } from "../ui/separator";

export function SubscriptionCard() {
  const { data: user } = useUser();
  const { data: userSubscription } = useUserSubscription(user);
  const { mutate: cancelUserSubscription } = useCancelUserSubscription();

  if (!userSubscription) return <NoSubscriptionCard />;

  const planName = userSubscription.plan.name;
  const price = userSubscription.plan.price;
  const currency = userSubscription.plan.currency;
  const nextBillingDate = formatUnixTimestamp(
    userSubscription.currentPeriodEnd,
  );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(price / 100);

  return (
    <Card className="rounded-lg border-0 shadow-lg flex flex-col">
      <CardHeader className="-mb-4">
        <CardDescription className="text-muted-foreground font-medium">
          Active plan
        </CardDescription>
        <CardTitle className="text-3xl font-bold mt-1 text-primary">
          {planName}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div>
          <p className="text-muted-foreground text-sm">
            Your next bill is for{" "}
            <span className="text-primary">{formattedPrice}</span> on{" "}
            <span className="text-primary">{nextBillingDate}</span>.
          </p>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="w-full flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <p className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200 cursor-pointer">
              Manage Subscription
            </p>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Subscription</DialogTitle>
              <DialogDescription>
                Choose an action for your {planName} subscription.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex justify-end gap-3 py-4">
              <Button variant="outline" asChild className="justify-start gap-2">
                <Link to="/pricing">Change Plan</Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  cancelUserSubscription(userSubscription.subscriptionId);
                }}
              >
                Cancel Subscription
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
