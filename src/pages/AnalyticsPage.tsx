import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AnalyticsPage = () => {
  return (
    <>
      <p className="text-muted-foreground mb-8">
        Track your performance and growth.
      </p>

      <Card className="border-dashed">
        <CardContent className="py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Construction className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Analytics Module Under Construction
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Advanced insights and reporting features are coming soon.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default AnalyticsPage;
