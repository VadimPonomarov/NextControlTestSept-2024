import React from "react";
import {Input} from "@/components/ui/input";
import {FormFieldProps} from "@/components/All/FormField/index";

import css from "./index.module.css";


const FormField = <T, >({name, label, register, errors, type = "text", disabled = false}: FormFieldProps<T>) => {
    const errorMessage = errors[name as keyof T]?.message as string;

    return (
        <div className={css.formGroup}>
            <label htmlFor={String(name)}>{label}</label>
            <Input {...register(name)} id={String(name)} type={type} disabled={disabled}/>
            {errorMessage && (
                <small className={css.error}>{errorMessage}</small>
            )}
        </div>
    );
};

export default FormField

