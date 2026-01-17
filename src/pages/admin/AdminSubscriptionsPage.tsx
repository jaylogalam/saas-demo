import { Suspense } from "react";
import { Navigate } from "react-router-dom";
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
import { PageHeader } from "@/components/layouts/PageHeader";
import {
  useAdminUsers,
  useAdmin,
  type AdminUser,
} from "@/features/admin/hooks";
import { formatUnixTimestamp } from "@/utils/formatDate";

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

// ============================================================================
// Subscription Row Component
// ============================================================================

interface SubscriptionRowProps {
  user: AdminUser;
}

function SubscriptionRow({ user }: SubscriptionRowProps) {
  const statusConfig = getStatusConfig(user.subscription_status);
  if (!statusConfig) return null; // Skip users without subscriptions

  const StatusIcon = statusConfig.icon;

  return (
    <tr className="border-b last:border-0 hover:bg-muted/30 transition-colors">
      <td className="p-4">
        <div>
          <p className="font-medium">{user.full_name || "—"}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </td>
      <td className="p-4">
        <span className="text-sm font-medium">{user.product_name}</span>
      </td>
      <td className="p-4">
        <Badge className={statusConfig.color} variant="outline">
          <StatusIcon className="mr-1 size-3" />
          {statusConfig.label}
        </Badge>
      </td>
      <td className="p-4 text-sm text-muted-foreground capitalize">
        {user.billing_interval || "—"}
      </td>
      <td className="p-4 text-sm text-muted-foreground">
        {user.current_period_start
          ? formatUnixTimestamp(user.current_period_start)
          : "—"}
      </td>
      <td className="p-4 text-sm text-muted-foreground">
        {user.current_period_end
          ? formatUnixTimestamp(user.current_period_end)
          : "—"}
      </td>
    </tr>
  );
}

// ============================================================================
// Subscriptions Table Component
// ============================================================================

interface SubscriptionsTableProps {
  users: AdminUser[];
}

function SubscriptionsTable({ users }: SubscriptionsTableProps) {
  const subscribedUsers = users.filter((u) => u.subscription_status);

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
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-4 text-left text-sm font-semibold">User</th>
            <th className="p-4 text-left text-sm font-semibold">Plan</th>
            <th className="p-4 text-left text-sm font-semibold">Status</th>
            <th className="p-4 text-left text-sm font-semibold">Billing</th>
            <th className="p-4 text-left text-sm font-semibold">
              Period Start
            </th>
            <th className="p-4 text-left text-sm font-semibold">
              Next Billing
            </th>
          </tr>
        </thead>
        <tbody>
          {subscribedUsers.map((user) => (
            <SubscriptionRow key={user.subscription_id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// Admin Subscriptions Page Content
// ============================================================================

function AdminSubscriptionsPageContent() {
  const { data: isAdmin, isLoading: isAdminLoading } = useAdmin();
  const { data: users, isLoading: isUsersLoading } = useAdminUsers();

  if (isAdminLoading) return <AdminSkeleton />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  if (isUsersLoading) return <AdminSkeleton />;

  const allUsers = users ?? [];
  const subscribedCount = allUsers.filter((u) => u.subscription_status).length;
  const activeCount = allUsers.filter(
    (u) =>
      u.subscription_status === "active" ||
      u.subscription_status === "trialing",
  ).length;

  return (
    <div className="space-y-6">
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
              {allUsers.length > 0
                ? Math.round((subscribedCount / allUsers.length) * 100)
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
          <SubscriptionsTable users={allUsers} />
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// Main Export
// ============================================================================

const AdminSubscriptionsPage = () => {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AdminSubscriptionsPageContent />
    </Suspense>
  );
};

export default AdminSubscriptionsPage;
