import { Page, PageHeader } from "@/components/ui/page";
import { SubscriptionCard } from "@/components/subscription/SubscriptionCard";
import { PaymentMethodCard } from "@/components/subscription/PaymentMethod";
import { Suspense } from "react";
import { BillingHistoryTable } from "@/components/subscription/BillingHistoryTable";

export function BillingPage() {
  return (
    <Suspense fallback={<BillingPageSkeleton />}>
      <Page>
        <PageHeader
          title="Billing"
          description="Manage your subscription and billing information"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <SubscriptionCard />
          <PaymentMethodCard />
        </div>

        <BillingHistoryTable />
      </Page>
    </Suspense>
  );
}

function BillingPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-muted rounded-lg" />
      <div className="h-4 w-64 bg-muted rounded" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-48 bg-muted rounded-xl" />
        <div className="h-48 bg-muted rounded-xl" />
      </div>
    </div>
  );
}

export default BillingPage;
