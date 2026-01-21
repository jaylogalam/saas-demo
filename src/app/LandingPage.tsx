import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSuspenseUser } from "@/hooks/auth/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const LandingPage = () => {
  const user = useSuspenseUser();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 py-20 text-center">
        <Suspense fallback={<LandingPageSkeleton />}>
          <>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
              Build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                amazing
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              A modern platform designed to help you work smarter and achieve
              more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8" asChild>
                <Link to={user ? "/dashboard" : "/signup"}>
                  {user ? "Go to Dashboard" : "Get Started"}
                  {!user && <ArrowRight className="ml-2" size={18} />}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8"
                asChild
              >
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </>
        </Suspense>
      </div>
    </div>
  );
};

function LandingPageSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="h-20 w-3/4 max-w-2xl mb-6 rounded-lg" />
      <Skeleton className="h-8 w-1/2 max-w-lg mb-10 rounded-md" />
      <div className="flex gap-4">
        <Skeleton className="h-11 w-40 rounded-md" />
        <Skeleton className="h-11 w-40 rounded-md" />
      </div>
    </div>
  );
}

export default LandingPage;
