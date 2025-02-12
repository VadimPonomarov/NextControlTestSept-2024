import React, {FC} from "react";
import FormField from "@/components/All/FormField/FormField.tsx";
import {ICar} from "@/common/interfaces/cars.interfaces";

import {FormFieldsRendererProps} from ".";


const FormFieldsRenderer: FC<FormFieldsRendererProps<ICar>> = ({fields, register, errors, item}) => (
    <>
        {fields.map((field) => {
            if (field.condition && !field.condition(item)) {
                return null;
            }
            return (
                <FormField
                    key={String(field.name)}
                    name={field.name}
                    label={field.label}
                    register={register}
                    errors={errors}
                    type={field.type}
                    disabled={field.disabled}
                />
            );
        })}
    </>
);

export default FormFieldsRenderer;
