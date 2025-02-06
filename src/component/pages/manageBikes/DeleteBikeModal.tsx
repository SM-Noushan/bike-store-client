import { FC } from "react";
import { toast } from "sonner";
import Modal from "@/component/modal/Modal";
import { TCustomError, IModalPropsWithTargetId } from "@/types";
import { useDeleteProductMutation } from "@/app/features/product/productApi";

const DeleteBikeModal: FC<IModalPropsWithTargetId> = ({
  open,
  initialValue,
  setOpen,
  resetTargetId,
}) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const onSubmit = async () => {
    const toastId = toast.loading("Deleting bike...");
    try {
      await deleteProduct(initialValue).unwrap();
      toast.success("Bike deleted successfully", { id: toastId });
      resetTargetId("");
      setOpen(false);
    } catch (error) {
      toast.error((error as TCustomError)?.data?.message, { id: toastId });
    }
  };

  return (
    <Modal
      open={open}
      title={"Delete Bike"}
      onClose={setOpen}
      onSave={onSubmit}
      onSaveLabel="Delete"
      disabled={isLoading}
    />
  );
};

export default DeleteBikeModal;
