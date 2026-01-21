import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/app/layouts/PageHeader";
import {
  useAdminUsers,
  useAdmin,
  type AdminUser,
} from "@/features/auth/hooks/useAdmin";
import { formatDate } from "@/utils/formatDate";

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
      <td className="p-4 text-sm text-muted-foreground font-mono text-xs">
        {user.user_id.slice(0, 8)}...
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
            <th className="p-4 text-left text-sm font-semibold">User ID</th>
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
// Admin Users Page Content
// ============================================================================

function AdminUsersPageContent() {
  const { admin, adminLoading } = useAdmin();
  const { data: users, isLoading: isUsersLoading } = useAdminUsers();

  if (adminLoading) return <AdminSkeleton />;
  if (!admin) return <Navigate to="/dashboard" replace />;
  if (isUsersLoading) return <AdminSkeleton />;

  // Deduplicate users (a user may appear multiple times if they have multiple subscriptions)
  const uniqueUsers = users
    ? Array.from(new Map(users.map((u) => [u.user_id, u])).values())
    : [];
  const userCount = uniqueUsers.length;

  return (
    <div className="space-y-6">
      <PageHeader title="App Users" description="View all registered users" />

      {/* Stats Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-3xl">{userCount}</CardTitle>
        </CardHeader>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            All Users
          </CardTitle>
          <CardDescription>
            All registered users in your application
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <UsersTable users={uniqueUsers} />
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// Main Export
// ============================================================================

const AdminUsersPage = () => {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AdminUsersPageContent />
    </Suspense>
  );
};

export default AdminUsersPage;
