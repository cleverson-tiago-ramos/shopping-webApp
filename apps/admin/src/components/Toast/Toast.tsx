// apps/admin/src/components/Toast/Toast.tsx
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

type ToastProps = {
  id: number;
  title: string;
  message: string;
  type: ToastType;
  onClose: (id: number) => void;
};

const icons: Record<ToastType, () => JSX.Element> = {
  success: () => <CheckCircle size={20} />,
  error: () => <AlertCircle size={20} />,
  info: () => <Info size={20} />,
  warning: () => <AlertTriangle size={20} />,
};

export default function Toast({
  id,
  title,
  message,
  type,
  onClose,
}: ToastProps) {
  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">{icons[type]()}</div>
      <div className="toast-content">
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      <button className="toast-close" onClick={() => onClose(id)}>
        <X size={14} />
      </button>
    </div>
  );
}
