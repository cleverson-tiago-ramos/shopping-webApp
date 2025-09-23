// apps/admin/src/components/Toast/ToastProvider.tsx
"use client";
import {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import Toast from "./Toast";

type ToastType = "success" | "error" | "info" | "warning";

type ToastItem = {
  id: number;
  title: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (title: string, message: string, type?: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (title: string, message: string, type: ToastType = "info") => {
      const id = Date.now();
      setToasts((prev) => {
        const updated = [...prev, { id, title, message, type }];
        return updated.slice(-5); // mantém os últimos 5
      });

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  const handleClose = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-wrapper">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            title={t.title}
            message={t.message}
            type={t.type}
            onClose={handleClose}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
