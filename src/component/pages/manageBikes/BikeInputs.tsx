import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/component/modal/Modal";
import {
  TCustomError,
  IModalPropsWithTargetId,
  TFieldConfig,
  TBikeInputsFormValues,
  IModalPropsWithProductData,
  TBike,
} from "@/types";
import { useForm } from "react-hook-form";
import FormWrapper from "@/component/form/FormWrapper";
import { bikeSchema, updateBikeSchema } from "@/schema/Bike.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCategories } from "@/constants/Constant";
import { uploadToCloudinary } from "@/utils/uploadImageToCloudinary";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/app/features/product/productApi";

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
    options: ProductCategories.map((category) => ({
      label: category,
      value: category,
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

const BikeInputModal = ({
  open,
  initialValue: actionType,
  setOpen,
  updateData,
  resetUpdateData,
}: IModalPropsWithProductData<TBike>) => {
  const [isLoading, setIsLoading] = useState(false);
  const isUpdate = actionType === "update";
  let formConfig = {};
  if (isUpdate) {
    const { name, brand, model, price, category, description, quantity } =
      updateData as TBike;
    formConfig = {
      resolver: zodResolver(updateBikeSchema),
      defaultValues: {
        name,
        brand,
        model,
        price: String(price),
        category,
        description,
        quantity: String(quantity),
      },
    };
  } else
    formConfig = {
      resolver: zodResolver(bikeSchema),
    };
  const formMethods = useForm<TBikeInputsFormValues>(formConfig);

  const [addProduct, { error: addProductError }] = useAddProductMutation();
  const [updateProduct, { error: updateProductError }] =
    useUpdateProductMutation();

  const onSubmit = async (data: TBikeInputsFormValues) => {
    setIsLoading(true);
    const toastId = toast.loading(
      `${isUpdate ? "Updating" : "Adding"} bike...`
    );
    let myData;
    if (isUpdate)
      myData = Object.keys(formMethods.formState.dirtyFields).reduce(
        (acc, key) => {
          const typedKey = key as keyof TBikeInputsFormValues;
          acc[typedKey] = data[typedKey];
          return acc;
        },
        {} as Partial<TBikeInputsFormValues>
      );
    else myData = data;
    // console.log(myData);
    // return;
    try {
      let image;
      if (myData.image) image = await uploadToCloudinary(data.image);
      if (isUpdate) {
        let requiredData;
        if (image) requiredData = { ...myData, image };
        else requiredData = myData;
        await updateProduct({
          id: updateData?._id,
          data: requiredData,
        }).unwrap();
      } else await addProduct({ ...myData, image }).unwrap();
      toast.success(
        `Product ${isUpdate ? "updated" : "added"} added successfully`,
        { id: toastId }
      );
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
