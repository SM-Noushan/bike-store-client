import { z } from "zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/component/modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/component/form/FormWrapper";
import { ICommonModalProps, TFieldConfig } from "@/types";

const commonPasswordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

const schema = z
  .object({
    currentPassword: commonPasswordSchema,
    newPassword: commonPasswordSchema,
    confirmPassword: commonPasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Infer the form values type from the schema
type FormValues = z.infer<typeof schema>;

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
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
    // formMethods.reset();
    // setOpen(false);
  };

  return (
    <Modal
      open={open}
      title="Update Password"
      onClose={setOpen}
      onSave={formMethods.handleSubmit(onSubmit)}
      onSaveLabel="Update"
    >
      <FormWrapper fields={fields} formMethods={formMethods} />
    </Modal>
  );
};

export default UpdatePassword;
