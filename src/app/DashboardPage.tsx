import { Construction } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Page, PageHeader } from "@/components/ui/page";

const DashboardPage = () => {
  return (
    <Page>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your account."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">—</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">—</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">—</div>
          </CardContent>
        </Card>
      </div>

      {/* WIP Section */}
      <Card className="border-dashed">
        <CardContent className="py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Construction className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Dashboard Content Coming Soon
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're working on bringing you powerful analytics, project
            management, and team collaboration tools.
          </p>
        </CardContent>
      </Card>
    </Page>
  );
};

export default DashboardPage;
