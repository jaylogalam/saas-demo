import { LoginForm } from "@/features/auth/components/LoginForm";
import { AppLogo } from "@/components/icons/AppLogo";
import { Page } from "@/components/ui/page";

export default function LoginPage() {
  return (
    <Page variant="auth">
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
    </Page>
  );
}
