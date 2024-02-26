interface ErrorDisplayProps {
  message?: string;
}
export const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  if (!message) return null; // Or some default fallback
  return <span className="text-red-500 pt-1 font-medium">{message}</span>;
};
