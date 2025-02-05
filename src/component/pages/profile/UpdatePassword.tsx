import {
  ICommonModalProps,
  TChangePasswordFormValues,
  TCustomError,
  TFieldConfig,
} from "@/types";
import { FC } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import Modal from "@/component/modal/Modal";
import { changePasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/component/form/FormWrapper";
import { useChangePasswordMutation } from "@/app/features/user/userApi";

// Field configuration for the FormWrapper
const fields: TFieldConfig[] = [
  {
    name: "currentPassword",
    label: "Current Password",
    type: "password",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
];

const UpdatePassword: FC<ICommonModalProps> = ({ open, setOpen }) => {
  const [changePassword, { error, isLoading }] = useChangePasswordMutation();
  const formMethods = useForm<TChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: TChangePasswordFormValues) => {
    // console.log("data", data);
    const toastId = toast.loading("Updating password...");
    try {
      await changePassword(data).unwrap();
      toast.success("Password updated successfully", { id: toastId });
      formMethods.reset();
      setOpen(false);
    } catch (error) {
      toast.error((error as TCustomError)?.data?.message, { id: toastId });
    }
  };

  return (
    <Modal
      open={open}
      title="Update Password"
      onClose={setOpen}
      onSave={formMethods.handleSubmit(onSubmit)}
      onSaveLabel="Update"
      disabled={isLoading}
    >
      <FormWrapper fields={fields} formMethods={formMethods} error={error} />
    </Modal>
  );
};

export default UpdatePassword;
