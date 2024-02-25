import { FieldError } from "react-hook-form";
export const ErrorDisplay = ({ error }: { error?: FieldError | any }) => {
  if (!error?.message) return null; // Or some default fallback
  const message = error?.message || "An unknown error occurred.";
  return <span className="text-red-500 pt-1 font-medium">{message}</span>;
};
