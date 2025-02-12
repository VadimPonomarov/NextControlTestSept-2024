"use client";
import React, {FC, useEffect, useRef, useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import {ResizableWrapper} from "@/components/All/ResizableWrapper/ResizableWrapper";
import FormFieldsRenderer from "@/components/All/FormFieldsRenderer/FormFieldsRenderer";
import {useCarForm} from "@/components/Forms/CarForm/useCarForm";
import {Button} from "@/components/ui/button";
import {schema} from "@/components/Forms/CarForm/schemas.joi";
import {ICar} from "@/common/interfaces/cars.interfaces";
import {FormFieldsConfig} from "@/components/All/FormField";

import css from "./carForm.module.css";

const formFields: FormFieldsConfig<ICar> = [
    {name: "id", label: "ID", type: "number", condition: (car: ICar | null) => !!car?.id, disabled: true},
    {name: "brand", label: "Brand"},
    {name: "price", label: "Price", type: "number"},
    {name: "year", label: "Year", type: "number"},
];

const CarForm: FC = () => {
    const [item, setAction] = useState<ICar | null>(null);
    const ref = useRef<HTMLFormElement>(null)

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset: resetAction,
        getValues
    } = useForm<ICar>({
        resolver: joiResolver(schema),
        defaultValues: item || {},
        mode: "all",
    });

    const {onSubmit, handleReset} = useCarForm({resetAction, item, setAction, getValues});

    useEffect(() => {
        resetAction(item);
    }, [item, resetAction]);

    return (
        <div className={css.container}>
            <ResizableWrapper>
                <form
                    ref={ref}
                    onSubmit={handleSubmit(onSubmit)}
                    className={css.form}
                >
                    <FormFieldsRenderer
                        fields={formFields}
                        register={register}
                        errors={errors}
                        item={item}
                    />
                    <div className={css.buttonGroup}>
                        <Button size={"sm"} type="submit" disabled={!isValid}>
                            {item?.id ? "Edit" : "Create"}
                        </Button>
                        <Button size={"sm"} type="button" onClick={() => handleReset(ref)}>
                            Reset
                        </Button>
                    </div>
                </form>
            </ResizableWrapper>
        </div>
    );
};

export default CarForm;
