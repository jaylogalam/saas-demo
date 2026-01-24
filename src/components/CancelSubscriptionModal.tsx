import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSubscriptionUpdate } from "@/hooks/subscription/useSubscriptionUpdate";

interface CancelSubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptionId: string;
  currentPeriodEnd: string;
  onSuccess?: () => void;
}

export function CancelSubscriptionModal({
  open,
  onOpenChange,
  subscriptionId,
  currentPeriodEnd,
  onSuccess,
}: CancelSubscriptionModalProps) {
  const { cancelSubscription, isLoading, error } = useSubscriptionUpdate();
  const [cancelImmediately, setCancelImmediately] = useState(false);

  const handleCancel = async () => {
    const success = await cancelSubscription(subscriptionId, cancelImmediately);
    if (success) {
      onOpenChange(false);
      onSuccess?.();
    }
  };

  const formattedEndDate = new Date(currentPeriodEnd).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Cancel Subscription
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your subscription?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4 space-y-4">
          {/* Option: Cancel at period end (default) */}
          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <input
              type="radio"
              name="cancelOption"
              checked={!cancelImmediately}
              onChange={() => setCancelImmediately(false)}
              className="mt-1"
            />
            <div>
              <p className="font-medium">Cancel at end of billing period</p>
              <p className="text-sm text-muted-foreground">
                Keep access until {formattedEndDate}, then your subscription
                will end.
              </p>
            </div>
          </label>

          {/* Option: Cancel immediately */}
          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <input
              type="radio"
              name="cancelOption"
              checked={cancelImmediately}
              onChange={() => setCancelImmediately(true)}
              className="mt-1"
            />
            <div>
              <p className="font-medium">Cancel immediately</p>
              <p className="text-sm text-muted-foreground">
                Your subscription will end now. No refund will be issued.
              </p>
            </div>
          </label>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Keep Subscription
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Confirm Cancellation"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
