export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  onClose: (value: boolean) => void;
  onSave: () => void;
  onSaveLabel?: string;
  disabled?: boolean;
}
