// apps/admin/src/components/Toast.tsx
type ToastProps = {
  message: string;
  type: "success" | "error" | "info" | "warning";
};

export default function Toast({ message, type }: ToastProps) {
  return <div className={`toast ${type}`}>{message}</div>;
}
