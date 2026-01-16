import { cn } from "@/utils/cn";

interface FormAlertProps {
  type: "error" | "success";
  message: string;
  className?: string;
}

const alertStyles = {
  error: "text-destructive bg-destructive/10",
  success: "text-green-600 bg-green-500/10",
} as const;

export function FormAlert({ type, message, className }: FormAlertProps) {
  return (
    <div
      className={cn("p-3 text-sm rounded-md", alertStyles[type], className)}
      role={type === "error" ? "alert" : "status"}
    >
      {message}
    </div>
  );
}
