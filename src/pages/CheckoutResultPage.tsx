import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";

interface CheckoutResultPageProps {
  success: boolean;
}

export function CheckoutResultPage({ success }: CheckoutResultPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4">
            {success ? (
              <div className="w-16 h-16 rounded-full bg-chart-2/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-chart-2" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl">
            {success ? "Payment Successful!" : "Payment Cancelled"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            {success
              ? "Thank you for your subscription! Your account has been upgraded and you now have access to all premium features."
              : "Your payment was cancelled. No charges have been made to your account."}
          </p>

          {success && sessionId && (
            <p className="text-xs text-muted-foreground">
              Session ID: {sessionId}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate("/")} className="w-full">
              {success ? "Go to Dashboard" : "Return Home"}
            </Button>
            {!success && (
              <Button
                variant="outline"
                onClick={() => navigate("/pricing")}
                className="w-full"
              >
                View Plans
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function CheckoutSuccessPage() {
  return <CheckoutResultPage success={true} />;
}

export function CheckoutCancelPage() {
  return <CheckoutResultPage success={false} />;
}
