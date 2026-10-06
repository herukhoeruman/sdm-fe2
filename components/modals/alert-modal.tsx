"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  loadingLabel?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title = "Apakah Anda yakin?",
  description = "Tindakan ini tidak dapat dibatalkan.",
  cancelLabel = "Cancel",
  confirmLabel = "Continue",
  loadingLabel,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={() => {
        if (!loading) onClose();
      }}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading && loadingLabel ? loadingLabel : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
