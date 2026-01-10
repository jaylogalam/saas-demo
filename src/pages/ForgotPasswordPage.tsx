import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { AppLogo } from "@/components/AppLogo";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-4 md:px-8">
        <div className="flex justify-center gap-2 md:justify-start">
          <AppLogo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
