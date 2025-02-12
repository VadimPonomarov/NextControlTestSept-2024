import {FieldErrors, UseFormRegister} from "react-hook-form";
import {FormFieldsConfig} from "@/components/All/FormField";

export interface FormFieldsRendererProps<T> {
    errors: FieldErrors<T>;
    fields: FormFieldsConfig<T>;
    item: T | null;
    register: UseFormRegister<T>;
}