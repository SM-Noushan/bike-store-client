import {
  TFieldConfig,
  TCustomError,
  TSetAddressFormValues,
  IModalPropsWithStringValue,
} from "@/types";
import { FC } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import Modal from "@/component/modal/Modal";
import { deliverAddressSchema } from "@/schema";
import FormWrapper from "@/component/form/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetDeliveryAddressMutation } from "@/app/features/user/userApi";

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
  const [setDeliverAddress, { error, isLoading }] =
    useSetDeliveryAddressMutation();
  const formMethods = useForm<TSetAddressFormValues>({
    resolver: zodResolver(deliverAddressSchema),
    defaultValues: { deliveryAddress: initialValue },
  });

  const onSubmit = async (data: TSetAddressFormValues) => {
    // console.log("data", data);
    const toastId = toast.loading("Updating address...");
    try {
      await setDeliverAddress(data).unwrap();
      toast.success("Delivery address updated successfully", { id: toastId });
      formMethods.reset();
      setOpen(false);
    } catch (error) {
      toast.error((error as TCustomError)?.data?.message, { id: toastId });
    }
  };

  return (
    <Modal
      open={open}
      title={initialValue ? "Update Address" : "Set Address"}
      onClose={setOpen}
      onSave={formMethods.handleSubmit(onSubmit)}
      onSaveLabel={initialValue ? "Update" : "Save"}
      disabled={isLoading}
    >
      <FormWrapper fields={fields} formMethods={formMethods} error={error} />
    </Modal>
  );
};

export default SetAddress;
