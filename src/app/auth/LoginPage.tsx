import { LoginForm } from "@/features/auth/components/LoginForm";
import { AppLogo } from "@/components/icons/AppLogo";
import { useSessionUser } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const user = useSessionUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-4 md:px-8">
        <div className="flex justify-center gap-2 md:justify-start">
          <AppLogo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
