import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function PaymentMethodCard() {
  return (
    <Card className="rounded-lg border-0 shadow-lg flex flex-col">
      <CardHeader className="-mb-4">
        <CardDescription className="text-muted-foreground font-medium">
          Payment Method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-muted-foreground text-sm">
              Securely stored and encrypted
            </p>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="w-full flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <p className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200 cursor-pointer">
              Update Payment Method
            </p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Payment Method</DialogTitle>
              <DialogDescription>
                Your payment details are securely managed by Stripe.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-4">
              <Button variant="outline" className="justify-start gap-2">
                <ExternalLink className="size-4" />
                Open Stripe Customer Portal
              </Button>
            </div>
            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
