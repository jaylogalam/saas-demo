import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page";
import { useSuspenseAdmin } from "@/hooks/auth/useAdmin";

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
  const admin = useSuspenseAdmin();

  if (!admin) return <Navigate to="/dashboard" replace />;

  return (
    <div className="space-y-6">
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
        <CardContent>
          <p className="text-muted-foreground">
            Add your test UI components here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

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
