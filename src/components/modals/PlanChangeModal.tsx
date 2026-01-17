import { useEffect, useState } from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { useSubscriptionUpdate } from "@/hooks/useSubscription";
import type {
  BillingInterval,
  ProrationPreview,
  SubscriptionPlan,
} from "@/types/subscription.types";

interface PlanChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: {
    name: string;
    price: number;
    interval: BillingInterval;
  };
  newPlan: SubscriptionPlan;
  newInterval: BillingInterval;
  subscriptionId: string;
  newPriceId: string;
  onSuccess?: () => void;
}

export function PlanChangeModal({
  open,
  onOpenChange,
  currentPlan,
  newPlan,
  newInterval,
  subscriptionId,
  newPriceId,
  onSuccess,
}: PlanChangeModalProps) {
  const { previewChange, confirmChange, isLoading, error, clearError } =
    useSubscriptionUpdate();

  const [preview, setPreview] = useState<ProrationPreview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const isUpgrade = newPlan.price[newInterval] > currentPlan.price;
  const newPrice = newPlan.price[newInterval];

  // Fetch proration preview when modal opens
  useEffect(() => {
    if (!open || !subscriptionId || !newPriceId) {
      setPreview(null);
      return;
    }

    let cancelled = false;
    setLoadingPreview(true);
    clearError();

    previewChange(subscriptionId, newPriceId)
      .then((result) => {
        if (!cancelled) setPreview(result);
      })
      .finally(() => {
        if (!cancelled) setLoadingPreview(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, subscriptionId, newPriceId]);

  const handleConfirm = async () => {
    const success = await confirmChange(subscriptionId, newPriceId);
    if (success) {
      onOpenChange(false);
      onSuccess?.();
    }
  };

  const formatCurrency = (amount: number, currency = "usd") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount / 100);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {isUpgrade ? "Upgrade Plan" : "Downgrade Plan"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isUpgrade
              ? "Your new plan will be activated immediately."
              : "Your plan change will take effect at the end of your current billing period."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Plan comparison */}
        <div className="flex items-center justify-between py-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="font-semibold">{currentPlan.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(currentPlan.price * 100)}/
              {currentPlan.interval === "yearly" ? "yr" : "mo"}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">New</p>
            <p className="font-semibold">{newPlan.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(newPrice * 100)}/
              {newInterval === "yearly" ? "yr" : "mo"}
            </p>
          </div>
        </div>

        <Separator />

        {/* Proration details */}
        <div className="py-4 space-y-3">
          {loadingPreview ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">
                Calculating changes...
              </span>
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          ) : preview ? (
            <>
              {isUpgrade ? (
                <>
                  {preview.credit > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Credit from current plan
                      </span>
                      <span className="text-green-600">
                        -{formatCurrency(preview.credit, preview.currency)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-medium">
                    <span>Amount due today</span>
                    <span>
                      {formatCurrency(
                        preview.immediateAmount,
                        preview.currency
                      )}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 rounded-md">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Scheduled downgrade</p>
                    <p className="text-amber-700 dark:text-amber-300 mt-1">
                      You'll keep your current plan features until{" "}
                      {new Date(preview.effectiveDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                      , then switch to {newPlan.name}.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading || loadingPreview || !!error}
            className={
              isUpgrade
                ? "bg-green-600 hover:bg-green-700"
                : "bg-amber-600 hover:bg-amber-700"
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isUpgrade ? (
              "Confirm Upgrade"
            ) : (
              "Schedule Downgrade"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
