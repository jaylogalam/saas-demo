import { User, Mail, Calendar, Shield, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Loading skeleton
function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-6">
        <div className="size-24 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="h-4 w-56 bg-muted rounded" />
        </div>
      </div>
      <div className="h-48 bg-muted rounded-xl" />
    </div>
  );
}

const ProfilePage = () => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 rounded-full bg-muted p-4">
            <User className="size-8 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-xl sm:text-2xl font-semibold tracking-tight">
            Not Signed In
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Please sign in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const email = user.email || "";
  const name =
    user.user_metadata?.full_name || user.user_metadata?.name || "User";
  const avatarUrl =
    user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const createdAt = user.created_at;
  const emailVerified = user.email_confirmed_at !== null;
  const provider = user.app_metadata?.provider || "email";

  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-bold tracking-tight">
          Profile
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account information
        </p>
      </div>

      {/* Profile Card */}
      <Card className="relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

        <CardContent className="pt-6">
          {/* Avatar Section */}
          <div className="relative mb-6 flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="relative">
              <Avatar className="size-20 sm:size-24 border-4 border-background shadow-lg">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl sm:text-2xl font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {/* TODO: Implement avatar upload */}
              <button
                className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-muted"
                title="Change avatar"
              >
                <Camera className="size-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold">{name}</h2>
              </div>
              <p className="text-muted-foreground">{email}</p>
              <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                {emailVerified && (
                  <Badge variant="secondary" className="gap-1">
                    <Check className="size-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Profile Details */}
          {/* TODO: Implement editable account details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Account Details</h3>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Display Name */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <User className="size-4" />
                  Display Name
                </Label>
                <p className="text-sm text-muted-foreground py-2">{name}</p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <Mail className="size-4" />
                  Email Address
                </Label>
                <p className="text-sm text-muted-foreground py-2">{email}</p>
              </div>

              {/* Member Since */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <Calendar className="size-4" />
                  Member Since
                </Label>
                <p className="text-sm text-muted-foreground py-2">
                  {createdAt ? formatDate(createdAt) : "N/A"}
                </p>
              </div>

              {/* Auth Provider */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <Shield className="size-4" />
                  Sign-in Method
                </Label>
                <p className="text-sm text-muted-foreground py-2 capitalize">
                  {provider}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="mt-6 border-destructive/20">
        <CardHeader>
          <CardTitle className="text-lg text-destructive">
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {/* TODO: Implement delete account */}
          <Button
            variant="outline"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
