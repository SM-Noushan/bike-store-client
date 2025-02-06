export interface ModalProps {
  children?: React.ReactNode;
  open: boolean;
  title: string;
  onClose: (value: boolean) => void;
  onSave: () => void;
  onSaveLabel?: string;
  disabled?: boolean;
}

export interface ICommonModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface IModalPropsWithStringValue extends ICommonModalProps {
  initialValue: string;
}

export interface IModalPropsWithTargetId extends IModalPropsWithStringValue {
  resetTargetId: (id: string) => void;
}

export interface IAuthModalProps extends ICommonModalProps {
  initialTab: () => void;
}
