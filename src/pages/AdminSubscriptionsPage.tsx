import { Suspense } from "react";
import {
  CreditCard,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Page, PageHeader } from "@/components/ui/page";
import { formatUnixTimestamp } from "@/utils/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserSubscriptionList } from "@/hooks/subscription/useUserSubscription";
import type { UserSubscription } from "@/types/subscription.types";

// ============================================================================
// Main Export
// ============================================================================

const AdminSubscriptionsPage = () => {
  const { data: userSubscriptionList } = useUserSubscriptionList();

  const allSubscriptions = userSubscriptionList ?? [];
  const subscribedCount = allSubscriptions.filter((u) => u.status).length;
  const activeCount = allSubscriptions.filter(
    (s) => s.status === "active" || s.status === "trialing",
  ).length;

  return (
    <Suspense fallback={<AdminSkeleton />}>
      <Page>
        <PageHeader
          title="User Subscriptions"
          description="View all subscription details"
        />

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Subscriptions</CardDescription>
              <CardTitle className="text-3xl">{subscribedCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active / Trialing</CardDescription>
              <CardTitle className="text-3xl">{activeCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Conversion Rate</CardDescription>
              <CardTitle className="text-3xl">
                {allSubscriptions.length > 0
                  ? Math.round(
                      (subscribedCount / allSubscriptions.length) * 100,
                    )
                  : 0}
                %
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="size-5" />
              All Subscriptions
            </CardTitle>
            <CardDescription>
              Subscription details for all paying users
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <SubscriptionsTable subscriptions={allSubscriptions} />
          </CardContent>
        </Card>
      </Page>
    </Suspense>
  );
};

// ============================================================================
// Loading Skeleton
// ============================================================================

function AdminSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-muted rounded-lg" />
      <div className="h-4 w-64 bg-muted rounded" />
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 bg-muted rounded" />
                  <div className="h-3 w-32 bg-muted rounded" />
                </div>
                <div className="h-6 w-20 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminSubscriptionsPage;

// ============================================================================
// Status Badge Configuration
// ============================================================================

function getStatusConfig(status: string | null) {
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
      return {
        label: "Past Due",
        color: "bg-red-500/15 text-red-600 border-red-500/20",
        icon: AlertCircle,
      };
    case "canceled":
      return {
        label: "Canceled",
        color: "bg-gray-500/15 text-gray-600 border-gray-500/20",
        icon: XCircle,
      };
    default:
      return null;
  }
}

// ============================================================================
// Subscriptions Table Component
// ============================================================================

interface SubscriptionsTableProps {
  subscriptions: UserSubscription[];
}

function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
  const subscribedUsers = subscriptions.filter((u) => u.status);

  if (subscribedUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CreditCard className="size-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">No subscriptions found</p>
        <p className="text-sm text-muted-foreground">
          Subscriptions will appear here when users subscribe.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow variant="header">
            <TableHead>User</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Billing</TableHead>
            <TableHead>Period Start</TableHead>
            <TableHead>Next Billing</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribedUsers.map((subscription) => (
            <SubscriptionRow
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ============================================================================
// Subscription Row Component
// ============================================================================

interface SubscriptionRowProps {
  subscription: UserSubscription;
}

function SubscriptionRow({ subscription }: SubscriptionRowProps) {
  const statusConfig = getStatusConfig(subscription.status);
  if (!statusConfig) return null; // Skip users without subscriptions

  const StatusIcon = statusConfig.icon;

  return (
    <TableRow variant="body">
      <TableCell>
        <p>{subscription.email}</p>
      </TableCell>
      <TableCell>
        <span className="font-medium">{subscription.plan.name}</span>
      </TableCell>
      <TableCell>
        <Badge className={statusConfig.color} variant="outline">
          <StatusIcon className="mr-1 size-3" />
          {statusConfig.label}
        </Badge>
      </TableCell>
      <TableCell capitalize>{subscription.plan.interval || "—"}</TableCell>
      <TableCell>
        {subscription.currentPeriodStart
          ? formatUnixTimestamp(subscription.currentPeriodStart)
          : "—"}
      </TableCell>
      <TableCell>
        {subscription.currentPeriodEnd
          ? formatUnixTimestamp(subscription.currentPeriodEnd)
          : "—"}
      </TableCell>
    </TableRow>
  );
}
