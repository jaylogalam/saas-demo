import { Suspense } from "react";
import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Page, PageHeader } from "@/components/ui/page";
import { formatDate } from "@/utils/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/user.types";
import { useAdminUserList } from "@/hooks/auth/useAdmin";

// ============================================================================
// Main Export
// ============================================================================

const AdminUsersPage = () => {
  const { data: users } = useAdminUserList();

  // Deduplicate users (a user may appear multiple times if they have multiple subscriptions)
  const uniqueUsers = users
    ? Array.from(new Map(users.map((u) => [u.id, u])).values())
    : [];
  const userCount = uniqueUsers.length;

  return (
    <Suspense fallback={<AdminSkeleton />}>
      <Page>
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
          {/* <CardContent className="p-0"> */}
          <UsersTable users={uniqueUsers} />
          {/* </CardContent> */}
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
// Users Table Component
// ============================================================================

interface UsersTableProps {
  users: User[];
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
      <Table>
        <TableHeader>
          <TableRow variant="header">
            <TableHead>User</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>User ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ============================================================================
// User Row Component
// ============================================================================

interface UserRowProps {
  user: User;
}

function UserRow({ user }: UserRowProps) {
  return (
    <TableRow>
      <TableCell>
        <p className="text-white font-medium">{user.name || "—"}</p>
        <p>{user.email}</p>
      </TableCell>
      <TableCell>{formatDate(user.createdAt)}</TableCell>
      <TableCell className="font-mono text-xs">
        {user.id.slice(0, 8)}...
      </TableCell>
    </TableRow>
  );
}

export default AdminUsersPage;
