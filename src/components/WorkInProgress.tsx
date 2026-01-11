import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface WorkInProgressProps {
  title?: string;
  showBackButton?: boolean;
}

export function WorkInProgress({
  title = "This page",
  showBackButton = true,
}: WorkInProgressProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center px-6 py-16 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <Construction className="text-primary" size={32} />
        </div>

        <h1 className="text-3xl font-bold mb-4">Currently Being Worked On</h1>

        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          {title} is under construction. We're working hard to bring you
          something amazing. Check back soon!
        </p>

        {showBackButton && (
          <Button variant="outline" asChild>
            <Link to="/" className="gap-2">
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default WorkInProgress;
