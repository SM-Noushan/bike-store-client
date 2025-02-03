import FormFields from "./FormFields";
import { Form } from "@/components/ui/form";
import { TFormWrapperProps } from "@/types";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, FormProvider } from "react-hook-form";

const FormWrapper = <T extends FieldValues>({
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitText = "Submit",
  buttonProps,
  formMethods,
}: TFormWrapperProps<T>) => {
  let methods = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });
  if (formMethods) methods = formMethods;

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        {!formMethods ? (
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <FormFields methods={methods} fields={fields} />
            <Button type="submit" className="w-full" {...buttonProps}>
              {submitText}
            </Button>
          </form>
        ) : (
          <FormFields methods={methods} fields={fields} />
        )}
      </Form>
    </FormProvider>
  );
};

export default FormWrapper;
