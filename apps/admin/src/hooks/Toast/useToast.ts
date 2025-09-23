// apps/admin/src/hooks/useToast.ts
import { useContext } from "react";
import { ToastContext } from "@/components/Toast/ToastProvider";

export default function useToast() {
  return useContext(ToastContext);
}
