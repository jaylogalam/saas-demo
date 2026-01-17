import { Link } from "react-router-dom";
import {
  CreditCard,
  CalendarClock,
  Sparkles,
  ArrowUpRight,
  Receipt,
  ShieldCheck,
  AlertCircle,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUserSubscription } from "@/features/subscription/hooks";
import { formatUnixTimestamp } from "@/utils/formatDate";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";

function getStatusConfig(status: string) {
  switch (status) {
    case "active":
      return {
        label: "Active",
        color: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
        icon: ShieldCheck,
      };
    case "trialing":
      return {
        label: "Trial",
        color: "bg-amber-500/15 text-amber-600 border-amber-500/20",
        icon: Sparkles,
      };
    case "past_due":
    case "unpaid":
      return {
        label: status === "past_due" ? "Past Due" : "Unpaid",
        color: "bg-red-500/15 text-red-600 border-red-500/20",
        icon: AlertCircle,
      };
    case "canceled":
      return {
        label: "Canceled",
        color: "bg-gray-500/15 text-gray-600 border-gray-500/20",
        icon: AlertCircle,
      };
    default:
      return {
        label: status,
        color: "bg-gray-500/15 text-gray-600 border-gray-500/20",
        icon: AlertCircle,
      };
  }
}

// Loading skeleton component
function BillingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-muted rounded-lg" />
      <div className="h-4 w-64 bg-muted rounded" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-48 bg-muted rounded-xl" />
        <div className="h-48 bg-muted rounded-xl" />
      </div>
    </div>
  );
}

// Empty state when no subscription
function NoSubscription() {
  return (
    <EmptyState
      icon={Rocket}
      title="No Active Subscription"
      description="Unlock premium features and take your experience to the next level. Choose a plan that works for you."
      action={{
        label: "View Plans",
        href: "/pricing",
        icon: ArrowUpRight,
      }}
    />
  );
}

const BillingPage = () => {
  const { data, isLoading } = useUserSubscription();

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BillingSkeleton />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <PageHeader
          title="Billing"
          description="Manage your subscription and billing information"
        />
        <Card>
          <NoSubscription />
        </Card>
      </div>
    );
  }

  const { subscription, productName, priceInterval } = data;
  const statusConfig = getStatusConfig(subscription.status);
  const StatusIcon = statusConfig.icon;

  const isActive =
    subscription.status === "active" || subscription.status === "trialing";
  const isCanceled = subscription.status === "canceled";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <PageHeader
        title="Billing"
        description="Manage your subscription and billing information"
      />

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Plan Card */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="size-5 text-primary" />
                Current Plan
              </CardTitle>
              <Badge className={statusConfig.color} variant="outline">
                <StatusIcon className="mr-1 size-3" />
                {statusConfig.label}
              </Badge>
            </div>
            <CardDescription>Your subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-2xl font-bold">{productName}</p>
              {priceInterval && (
                <p className="text-sm text-muted-foreground">
                  Billed {priceInterval === "month" ? "monthly" : "yearly"}
                </p>
              )}
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {isCanceled ? "Expires on" : "Next billing date"}
              </span>
              <span className="font-medium">
                {formatUnixTimestamp(subscription.current_period_end)}
              </span>
            </div>
            {isActive && !subscription.cancel_at_period_end && (
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
            )}
          </CardContent>
        </Card>

        {/* TODO: Implement Payment Method Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="size-5 text-primary" />
              Payment Method
            </CardTitle>
            <CardDescription>Manage your payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-background shadow-sm">
                <CreditCard className="size-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Managed by Stripe</p>
                <p className="text-sm text-muted-foreground">
                  Securely stored and encrypted
                </p>
              </div>
              <ShieldCheck className="size-5 text-emerald-500" />
            </div>
            <Button variant="outline" className="w-full" disabled>
              Update Payment Method
              <ArrowUpRight className="ml-1 size-4" />
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Payment method updates coming soon
            </p>
          </CardContent>
        </Card>
      </div>

      {/* TODO: Implement Billing History Section */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt className="size-5 text-primary" />
                Billing History
              </CardTitle>
              <CardDescription>View your past invoices</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <CalendarClock className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Billing history will be available here soon.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPage;
