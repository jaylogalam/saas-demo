import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface CancelSubscriptionButtonProps {
  onCancel: () => Promise<void> | void;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

export function CancelSubscriptionButton({
  onCancel,
  isLoading: externalIsLoading = false,
  className,
  disabled,
}: CancelSubscriptionButtonProps) {
  const [internalIsLoading, setInternalIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isLoading = externalIsLoading || internalIsLoading;

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setInternalIsLoading(true);
      await onCancel();
      setOpen(false);
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    } finally {
      setInternalIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className={cn("w-full sm:w-auto", className)}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cancelling...
            </>
          ) : (
            "Cancel Subscription"
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will immediately cancel your
            subscription and you will lose access to premium features at the end
            of your current billing period.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Keep Subscription
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Yes, cancel subscription"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
