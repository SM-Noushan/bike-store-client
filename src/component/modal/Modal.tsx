import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  onClose: (value: boolean) => void;
  onSave: () => void;
  onSaveLabel?: string;
}

const Modal: FC<ModalProps> = ({
  children,
  open,
  title,
  onClose,
  onSave,
  onSaveLabel = "Save",
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <span />
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-80">
        <DialogHeader>
          <DialogTitle className="px-3.5">{title}</DialogTitle>
          <DialogClose onClick={() => onClose(false)} />
        </DialogHeader>
        <div className="p-4">
          {children}

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => onClose(false)}>
              Cancel
            </Button>
            <Button onClick={() => onSave()}>{onSaveLabel}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
