import { FC } from "react";
import { toast } from "sonner";
import Modal from "@/component/modal/Modal";
import { TCustomError, IModalPropsWithTargetId } from "@/types";
import { useChangeStatusMutation } from "@/app/features/user/userApi";

const ChangeUserStatus: FC<IModalPropsWithTargetId> = ({
  open,
  initialValue,
  setOpen,
  resetTargetId,
}) => {
  const [changeUserStatus, { isLoading }] = useChangeStatusMutation();
  const label = initialValue.split(" ")[0];
  const id = initialValue.split(" ")[1];

  const onSubmit = async () => {
    const toastId = toast.loading("Updating status...");
    try {
      await changeUserStatus(id).unwrap();
      toast.success(`User ${label.toLocaleLowerCase()}ed successfully`, {
        id: toastId,
      });
      resetTargetId("");
      setOpen(false);
    } catch (error) {
      toast.error((error as TCustomError)?.data?.message, { id: toastId });
    }
  };

  return (
    <Modal
      open={open}
      title={"User Status"}
      onClose={setOpen}
      onSave={onSubmit}
      onSaveLabel={label}
      disabled={isLoading}
    />
  );
};

export default ChangeUserStatus;
