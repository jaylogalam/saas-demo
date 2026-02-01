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
} from "@/components/ui/dialog";
import { formatUnixTimestamp } from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import {
  useCancelUserSubscription,
  useRestoreUserSubscription,
  useUserSubscription,
} from "@/hooks/useUserSubscription";

import { Separator } from "../ui/separator";
import { formatSubscriptionPrice } from "@/utils/formatSubscriptionPrice";

export function SubscriptionCard() {
  const { data: user } = useUser();
  const { data: userSubscription } = useUserSubscription(user);
  const { mutate: cancelUserSubscription } = useCancelUserSubscription();
  const { mutate: restoreUserSubscription } = useRestoreUserSubscription();

  if (!userSubscription) return <NoSubscriptionCard />;

  return (
    <Card className="rounded-lg border-0 shadow-lg flex flex-col">
      <CardHeader className="-mb-4">
        <CardDescription className="text-muted-foreground font-medium">
          Active plan
        </CardDescription>
        <CardTitle className="text-3xl font-bold mt-1 text-primary">
          {userSubscription.plan.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Is ongoing subscription */}
        {!userSubscription.cancelAtPeriodEnd && (
          <div>
            <p className="text-muted-foreground text-sm">
              Your next bill is for{" "}
              <span className="text-primary">
                {formatSubscriptionPrice(
                  userSubscription.plan.price,
                  userSubscription.plan.currency,
                )}
              </span>{" "}
              on{" "}
              <span className="text-primary">
                {formatUnixTimestamp(userSubscription.currentPeriodEnd)}
              </span>
              .
            </p>
          </div>
        )}

        {/* Is cancelled subscription */}
        {userSubscription.cancelAtPeriodEnd && (
          <div>
            <p className="text-muted-foreground text-sm">
              Your subscription will end on{" "}
              <span className="text-primary">
                {formatUnixTimestamp(userSubscription.cancelAt)}
              </span>
              .
            </p>
          </div>
        )}
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
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex flex-col">
                <p className="text-xl font-semibold text-primary/90">
                  {userSubscription.plan.name}
                </p>
                <p>{userSubscription.plan.description}</p>
                <p>
                  {formatSubscriptionPrice(
                    userSubscription.plan.price,
                    userSubscription.plan.currency,
                  )}
                  /month
                </p>
              </div>

              <Separator />

              {userSubscription.cancelAtPeriodEnd && (
                <>
                  <p>
                    You have cancelled your subscription on{" "}
                    <span className="text-primary">
                      {formatUnixTimestamp(userSubscription.canceledAt)}
                    </span>
                    . You can still use the premium features until{" "}
                    <span className="text-primary">
                      {formatUnixTimestamp(userSubscription.cancelAt)}.
                    </span>
                  </p>
                  <div className="flex flex justify-end gap-3 py-4">
                    <Button
                      variant="outline"
                      asChild
                      className="justify-start gap-2"
                    >
                      <Link to="/pricing">View Plans</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start gap-2 text-primary"
                      onClick={() => {
                        restoreUserSubscription(
                          userSubscription.subscriptionId,
                        );
                      }}
                    >
                      Resume Subscription
                    </Button>
                  </div>
                </>
              )}

              {!userSubscription.cancelAtPeriodEnd && (
                <>
                  <p>
                    Your subscription will end on{" "}
                    <span className="text-primary">
                      {formatUnixTimestamp(userSubscription.currentPeriodEnd)}
                    </span>
                  </p>
                  <div className="flex flex justify-end gap-3 py-4">
                    <Button
                      variant="outline"
                      asChild
                      className="justify-start gap-2"
                    >
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
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export function NoSubscriptionCard() {
  return (
    <Card className="rounded-lg border-0 shadow-lg flex flex-col">
      <CardHeader className="-mb-4">
        <CardDescription className="text-muted-foreground font-medium">
          Current plan
        </CardDescription>
        <CardTitle className="text-xl font-bold mt-1 text-primary">
          Free
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm">
          Unlock premium features and take your experience to the next level.
        </p>
      </CardContent>

      <Separator />

      <CardFooter className="w-full flex justify-center">
        <Link
          to="/pricing"
          className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200 cursor-pointer"
        >
          View Plans
        </Link>
      </CardFooter>
    </Card>
  );
}
