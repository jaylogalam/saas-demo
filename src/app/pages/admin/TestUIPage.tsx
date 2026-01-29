import { Suspense } from "react";
import { Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Page, PageHeader } from "@/components/ui/page";

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

// ============================================================================
// Test UI Page Content
// ============================================================================

function TestUIPageContent() {
  return (
    <Page>
      <PageHeader
        title="Test UI"
        description="A playground for testing UI components"
      />

      {/* Example Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="size-5" />
            UI Components
          </CardTitle>
          <CardDescription>Test and preview UI components here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Add your test UI components here.
          </p>

          <div className="p-4 border rounded-md space-y-4">
            <h3 className="font-medium">Cancel Subscription Button</h3>
            <CancelSubscriptionButton
              onCancel={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                alert("Subscription cancelled!");
              }}
            />
          </div>
        </CardContent>
      </Card>
    </Page>
  );
}

import { CancelSubscriptionButton } from "@/components/buttons/CancelSubscriptionButton";

// ============================================================================
// Main Export
// ============================================================================

const TestUIPage = () => {
  return (
    <Suspense fallback={<TestUISkeleton />}>
      <TestUIPageContent />
    </Suspense>
  );
};

export default TestUIPage;
