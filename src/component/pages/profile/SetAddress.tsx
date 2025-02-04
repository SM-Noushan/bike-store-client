import { z } from "zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/component/modal/Modal";
import FormWrapper from "@/component/form/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { IModalPropsWithStringValue, TFieldConfig } from "@/types";

const schema = z.object({
  deliveryAddress: z.string().min(5, "Address must be at least 5 characters"),
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof schema>;

// Field configuration for the FormWrapper
const fields: TFieldConfig[] = [
  {
    name: "deliveryAddress",
    label: "Delivery Address",
    type: "textarea",
  },
];

const SetAddress: FC<IModalPropsWithStringValue> = ({
  open,
  initialValue,
  setOpen,
}) => {
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { deliveryAddress: initialValue },
  });

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
    formMethods.reset();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title={initialValue ? "Update Address" : "Set Address"}
      onClose={setOpen}
      onSave={formMethods.handleSubmit(onSubmit)}
      onSaveLabel={initialValue ? "Update" : "Save"}
    >
      <FormWrapper fields={fields} formMethods={formMethods} />
    </Modal>
  );
};

export default SetAddress;
