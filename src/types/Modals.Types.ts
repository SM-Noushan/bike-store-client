export interface ICommonModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface IModalPropsWithStringValue extends ICommonModalProps {
  initialValue: string;
}

export interface IAuthModalProps extends ICommonModalProps {
  initialTab: "login" | "register";
}
