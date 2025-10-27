import { AlertCircle } from "lucide-react";

type FormErrorProps = {
  message?: string;
};

/**
 * A reusable component to display a form field error message.
 * It automatically handles showing/hiding based on the message.
 */
export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 text-xs font-medium text-destructive mt-0">
      <AlertCircle className="h-3 w-3" />
      <p>{message}</p>
    </div>
  );
};
