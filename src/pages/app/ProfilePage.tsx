import { useState } from "react";
import { User, Calendar, Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/userStore";
import { useUpdateDisplayName } from "@/features/profile/hooks/useUpdateProfile";
import { formatDate } from "@/utils/formatDate";
import { PageHeader } from "@/components/layouts/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { Check } from "lucide-react";

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
  const { user, userLoading } = useUserStore();
  const updateDisplayName = useUpdateDisplayName();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  if (userLoading) {
    return (
      <div className="mx-auto max-w-3xl">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!user?.id) {
    return (
      <div className="mx-auto max-w-3xl">
        <EmptyState
          icon={User}
          title="Not Signed In"
          description="Please sign in to view your profile."
        />
      </div>
    );
  }

  const email = user.email || "";
  const name = user.name || "User";
  const avatarUrl = user.avatar_url || "";
  const createdAt = user.created_at;
  const emailVerified = user.email_confirmed_at !== null;

  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleUpdateName = async () => {
    if (editedName && editedName !== name) {
      await updateDisplayName.mutateAsync(editedName);
      toast.success("Display name updated successfully");
    }
    setIsEditingName(false);
  };

  const startEditingName = () => {
    setEditedName(name);
    setIsEditingName(true);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Profile"
        description="Manage your account information"
      />

      {/* Profile Card */}
      <Card className="relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

        <CardContent className="pt-6">
          {/* Avatar Section */}
          <div className="relative mb-6 flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="relative">
              <Avatar className="size-20 sm:size-24 border-4 border-background/60 shadow-lg">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl sm:text-2xl font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0">
              {isEditingName ? (
                <div className="flex items-center gap-2 mb-1">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdateName();
                      if (e.key === "Escape") setIsEditingName(false);
                    }}
                    onBlur={handleUpdateName}
                    className="text-xl font-bold h-9 max-w-[200px]"
                    autoFocus
                  />
                  {updateDisplayName.isPending && (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold truncate max-w-[200px] sm:max-w-[300px]">
                    {name}
                  </h2>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={startEditingName}
                    className="shrink-0 size-8"
                  >
                    <Pencil className="size-3.5 text-muted-foreground" />
                  </Button>
                </div>
              )}
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
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Account Details</h3>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Member Since - Read only */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <Calendar className="size-4" />
                  Member Since
                </Label>
                <p className="text-sm text-muted-foreground py-2">
                  {createdAt ? formatDate(createdAt) : "N/A"}
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
