import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { ZodSchema } from "zod";
import { ButtonProps } from "@/components/ui/button";
import { ReactNode } from "react";

interface IBaseFieldConfig {
  name: string;
  label?: string | ReactNode;
  placeholder?: string;
  description?: string;
}

interface IInput {
  type: "text" | "email" | "password";
}

interface IPriceRange {
  type: "price-range";
  min: number;
  max: number;
}

interface ISelect {
  type: "select";
  options: { value: string; label: string }[];
}

interface ICheckboxGroup {
  type: "checkbox-group";
  options: { value: string; label: string }[];
}

interface IRadioGroup {
  type: "radio";
  options: { value: string; label: string }[];
}

export type TFieldConfig =
  | (IBaseFieldConfig & IInput)
  | (IBaseFieldConfig & IPriceRange)
  | (IBaseFieldConfig & ISelect)
  | (IBaseFieldConfig & ICheckboxGroup)
  | (IBaseFieldConfig & IRadioGroup);

type TCommonFormProps<T extends FieldValues> = {
  schema?: ZodSchema<T>;
  fields: TFieldConfig[];
  defaultValues?: DefaultValues<T>;
};
type TSingleFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  submitText?: string;
  buttonProps?: ButtonProps;
  formMethods?: never;
} & TCommonFormProps<T>;

type TMultiFormProps<T extends FieldValues> = {
  formMethods: UseFormReturn<T>;
  submitText?: string;
  buttonProps?: ButtonProps;
  onSubmit?: never;
} & TCommonFormProps<T>;

export type TFormWrapperProps<T extends FieldValues> =
  | TSingleFormProps<T>
  | TMultiFormProps<T>;

export type TFormFields = {
  methods: UseFormReturn<any>;
  fields: TFieldConfig[];
};

export type TFormMethod = {
  formMethods: UseFormReturn<any>;
};
