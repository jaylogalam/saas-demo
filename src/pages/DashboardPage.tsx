import { Construction } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {
  return (
    <>
      <p className="text-muted-foreground mb-8">
        Welcome back! Here's an overview of your account.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      <Separator className="my-8" />

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
    </>
  );
};

export default DashboardPage;
