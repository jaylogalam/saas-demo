import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Clock,
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
import { PageHeader } from "@/components/PageHeader";
import {
  useAdminUsers,
  useIsAdmin,
  type AdminUser,
} from "@/hooks/useAdminUsers";
import { formatDate } from "@/utils/formatDate";

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
      return {
        label: "Free",
        color: "bg-blue-500/15 text-blue-600 border-blue-500/20",
        icon: Clock,
      };
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
                <div className="h-10 w-10 bg-muted rounded-full" />
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
// User Row Component
// ============================================================================

interface UserRowProps {
  user: AdminUser;
}

function UserRow({ user }: UserRowProps) {
  const statusConfig = getStatusConfig(user.subscription_status);
  const StatusIcon = statusConfig.icon;

  return (
    <tr className="border-b last:border-0 hover:bg-muted/30 transition-colors">
      <td className="p-4">
        <div>
          <p className="font-medium">{user.full_name || "—"}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </td>
      <td className="p-4 text-sm text-muted-foreground">
        {formatDate(user.joined_at)}
      </td>
      <td className="p-4">
        <span className="text-sm font-medium">
          {user.product_name || "Free"}
        </span>
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
    </tr>
  );
}

// ============================================================================
// Users Table Component
// ============================================================================

interface UsersTableProps {
  users: AdminUser[];
}

function UsersTable({ users }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Users className="size-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">No users found</p>
        <p className="text-sm text-muted-foreground">
          Users will appear here when they sign up.
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
            <th className="p-4 text-left text-sm font-semibold">Joined</th>
            <th className="p-4 text-left text-sm font-semibold">Plan</th>
            <th className="p-4 text-left text-sm font-semibold">Status</th>
            <th className="p-4 text-left text-sm font-semibold">Billing</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.user_id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// Admin Page Content
// ============================================================================

function AdminPageContent() {
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { data: users, isLoading: isUsersLoading } = useAdminUsers();

  // Check admin access
  if (isAdminLoading) {
    return <AdminSkeleton />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Loading users
  if (isUsersLoading) {
    return <AdminSkeleton />;
  }

  const userCount = users?.length ?? 0;
  const subscribedCount =
    users?.filter((u) => u.subscription_status).length ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Manage users and view subscription details"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{userCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Subscriptions</CardDescription>
            <CardTitle className="text-3xl">{subscribedCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-3xl">
              {userCount > 0
                ? Math.round((subscribedCount / userCount) * 100)
                : 0}
              %
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            All Users
          </CardTitle>
          <CardDescription>
            View and manage all registered users
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <UsersTable users={users ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// Main Export with Suspense
// ============================================================================

const AdminPage = () => {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AdminPageContent />
    </Suspense>
  );
};

export default AdminPage;
