import {FieldErrors, UseFormRegister} from "react-hook-form";

export interface FormFieldConfig<T> {
    name: keyof T;
    label: string;
    type?: string;
    condition?: (item: T | null) => boolean;
    disabled?: boolean;
}

export type FormFieldsConfig<T> = FormFieldConfig<T>[]


export interface FormFieldProps<T> {
    name: Path<T>;
    label: string;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    type?: string;
    disabled?: boolean;
}
