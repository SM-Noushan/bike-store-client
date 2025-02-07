import {
  TBike,
  TCustomError,
  TFieldConfig,
  TBikeInputsFormValues,
  IModalPropsWithProductData,
} from "@/types";
import { toast } from "sonner";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/app/features/product/productApi";
import Modal from "@/component/modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/component/form/FormWrapper";
import { bikeSchema, updateBikeSchema } from "@/schema";
import { capitalize, uploadToCloudinary } from "@/utils";
import { useProductMetaData } from "@/hooks/useProductMetaData";

const BikeInputModal: FC<IModalPropsWithProductData<TBike>> = ({
  open,
  initialValue: actionType,
  setOpen,
  updateData,
  resetUpdateData,
}) => {
  const { productCategories } = useProductMetaData();
  const fields: TFieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter bike name",
    },
    {
      name: "brand",
      label: "Brand",
      type: "text",
      placeholder: "Enter bike brand",
    },
    {
      name: "model",
      label: "Model",
      type: "text",
      placeholder: "Enter bike model",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter bike description",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      placeholder: "Select a category",
      options: productCategories.map((category) => ({
        value: category.toLowerCase(),
        label: capitalize(category),
      })),
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "Enter bike price",
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "Enter bike quantity",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
    },
  ];
  const isUpdate = actionType === "update";
  const formConfig = isUpdate
    ? {
        resolver: zodResolver(updateBikeSchema),
        defaultValues: {
          name: updateData?.name,
          brand: updateData?.brand,
          model: updateData?.model,
          category: updateData?.category.toLowerCase(),
          description: updateData?.description,
          quantity: String(updateData?.quantity) as unknown as number,
          price: String(updateData?.price) as unknown as number,
        },
      }
    : {
        resolver: zodResolver(bikeSchema),
      };

  const formMethods = useForm<TBikeInputsFormValues>(formConfig);

  const [isLoading, setIsLoading] = useState(false);
  const [addProduct, { error: addProductError }] = useAddProductMutation();
  const [updateProduct, { error: updateProductError }] =
    useUpdateProductMutation();

  // Helper to collect only dirty fields when updating
  const getDirtyFields = (
    data: TBikeInputsFormValues
  ): Partial<TBikeInputsFormValues> =>
    Object.keys(formMethods.formState.dirtyFields).reduce<
      Partial<TBikeInputsFormValues>
    >((acc, key) => {
      const typedKey = key as keyof TBikeInputsFormValues;
      return { ...acc, [typedKey]: data[typedKey] };
    }, {});

  const onSubmit = async (data: TBikeInputsFormValues) => {
    setIsLoading(true);
    const toastId = toast.loading(
      `${isUpdate ? "Updating" : "Adding"} bike...`
    );
    try {
      // If updating, only send dirty fields.
      const myData = isUpdate ? getDirtyFields(data) : data;
      if (Object.keys(myData).length === 0)
        return toast.error("No changes detected", { id: toastId });
      let image;
      if (myData.image) {
        image = await uploadToCloudinary(data.image);
      }
      if (isUpdate) {
        const requiredData = image ? { ...myData, image } : myData;
        await updateProduct({
          id: updateData?._id,
          data: requiredData,
        }).unwrap();
      } else await addProduct({ ...myData, image }).unwrap();

      toast.success(`Product ${isUpdate ? "updated" : "added"} successfully`, {
        id: toastId,
      });
      if (isUpdate && resetUpdateData) resetUpdateData(null);
      setOpen(false);
    } catch (error) {
      toast.error(
        (error as TCustomError)?.data?.message || "Failed. Try again",
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Bike Information"
      onClose={setOpen}
      onSave={formMethods.handleSubmit(onSubmit)}
      onSaveLabel="Save"
      disabled={isLoading}
    >
      <FormWrapper
        fields={fields}
        formMethods={formMethods}
        error={isUpdate ? updateProductError : addProductError}
      />
    </Modal>
  );
};

export default BikeInputModal;
