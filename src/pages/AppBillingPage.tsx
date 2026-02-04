import { Page, PageContent, PageHeader } from "@/components/ui/page";
import { SubscriptionCard } from "@/components/cards/SubscriptionCard";
import { PaymentMethodCard } from "@/components/cards/PaymentMethodCard";
import { Suspense } from "react";
import { BillingHistoryTable } from "@/components/tables/BillingHistoryTable";

export function BillingPage() {
  return (
    <Suspense fallback={<BillingPageSkeleton />}>
      <Page className="w-full lg:max-w-256 lg:min-w-164 md:max-w-200 mx-auto">
        <PageHeader
          title="Billing"
          description="Manage your subscription and billing information"
        />

        <PageContent>
          <SubscriptionCard />
          <PaymentMethodCard />

          <BillingHistoryTable />
        </PageContent>
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
