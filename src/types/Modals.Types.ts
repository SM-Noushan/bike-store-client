export interface ICommonModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface IModalPropsWithStringValue extends ICommonModalProps {
  initialValue: string;
}
