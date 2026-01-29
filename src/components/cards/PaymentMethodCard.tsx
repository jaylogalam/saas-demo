import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CreditCard, ShieldCheck } from "lucide-react";

/* TODO: Implement Payment Method Card */
export function PaymentMethodCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          Payment Method
        </CardTitle>
        <CardDescription>Manage your payment details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-background shadow-sm">
            <CreditCard className="size-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Managed by Stripe</p>
            <p className="text-sm text-muted-foreground">
              Securely stored and encrypted
            </p>
          </div>
          <ShieldCheck className="size-5 text-emerald-500" />
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" disabled>
          Update Payment Method
          <ArrowUpRight className="ml-1 size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
