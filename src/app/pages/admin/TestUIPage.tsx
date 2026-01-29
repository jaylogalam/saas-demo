import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Page, PageContent, PageHeader } from "@/components/ui/page";

import { SubscriptionCard } from "@/components/subscription/SubscriptionCard";
import { CancelSubscriptionButton } from "@/components/subscription/CancelSubscriptionButton";

// ============================================================================
// Main Export
// ============================================================================

const TestUIPage = () => {
  return (
    <Suspense fallback={<TestUISkeleton />}>
      <Page>
        <PageHeader
          title="Test UI"
          description="A playground for testing UI components"
        />

        <PageContent className="w-1/3">
          <SubscriptionCard />
          <CancelSubscriptionButton />
        </PageContent>
      </Page>
    </Suspense>
  );
};

export default TestUIPage;

// ============================================================================
// Loading Skeleton
// ============================================================================

function TestUISkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-muted rounded-lg" />
      <div className="h-4 w-64 bg-muted rounded" />
      <Card>
        <CardContent className="p-6">
          <div className="h-32 bg-muted rounded" />
        </CardContent>
      </Card>
    </div>
  );
}
