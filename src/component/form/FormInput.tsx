import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type: "text" | "email" | "password" | "textarea" | "select";
  options?: string[];
}

interface DynamicFormProps<T extends FieldValues> {
  title?: string;
  schema: ZodSchema<T>;
  fields: FieldConfig[];
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  submitText?: string;
}

const DynamicForm = <T extends FieldValues>({
  title,
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitText = "Submit",
}: DynamicFormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <section className="p-4 shadow-md bg-white dark:bg-neutral-900">
            {title && (
              <header className="text-lg font-semibold">{title}</header>
            )}
            <div className="space-y-4">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={methods.control}
                  name={field.name as any}
                  render={({ field: controllerField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === "text" ||
                        field.type === "email" ||
                        field.type === "password" ? (
                          <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            {...controllerField}
                          />
                        ) : field.type === "textarea" ? (
                          <Input
                            placeholder={field.placeholder}
                            {...controllerField}
                          />
                        ) : field.type === "select" && field.options ? (
                          <Select
                            onValueChange={controllerField.onChange}
                            defaultValue={controllerField.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : null}
                      </FormControl>
                      {field.description && (
                        <FormDescription>{field.description}</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <footer>
              <Button type="submit" className="w-full">
                {submitText}
              </Button>
            </footer>
          </section>
        </form>
      </Form>
    </FormProvider>
  );
};

export default DynamicForm;
