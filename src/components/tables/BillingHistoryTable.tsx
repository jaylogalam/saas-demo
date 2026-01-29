import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

// TODO: Implement Billing History Section
export function BillingHistoryTable() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              Billing History
            </CardTitle>
            <CardDescription>View your past invoices</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-4 rounded-full bg-muted p-3">
            <CalendarClock className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Billing history will be available here soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
