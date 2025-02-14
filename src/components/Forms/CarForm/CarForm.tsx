"use client";
import React, {FC, useEffect, useRef, useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import {ResizableWrapper} from "@/components/All/ResizableWrapper/ResizableWrapper";
import FormFieldsRenderer from "@/components/All/FormFieldsRenderer/FormFieldsRenderer";
import {Button} from "@/components/ui/button";
import {schema} from "@/components/Forms/CarForm/index.joi.ts";
import {ICar} from "@/common/interfaces/cars.interfaces";
import {FormFieldsConfig} from "@/components/All/FormField";
import {useIndexForm} from "@/components/Forms/CarForm/useIndexForm.tsx";
import ButtonGroup from "@/components/All/ButtonGroup/ButtonGroup.tsx";
import {PencilSquareIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import {ArrowPathIcon} from "@heroicons/react/16/solid";

import css from "./index.module.css";

const formFields: FormFieldsConfig<ICar> = [
    {name: "id", label: "ID", type: "number", condition: (car: ICar | null) => !!car?.id, disabled: true},
    {name: "brand", label: "Brand"},
    {name: "price", label: "Price", type: "number"},
    {name: "year", label: "Year", type: "number"},
];

const CarForm: FC = () => {
    const [item, setAction] = useState<ICar | null>(null);
    const ref = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset: resetAction,
        getValues,
    } = useForm<ICar>({
        resolver: joiResolver(schema),
        defaultValues: item || {},
        mode: "all",
    });

    const {onSubmit, handleReset} = useIndexForm({resetAction, item, setAction, getValues});

    useEffect(() => {
        resetAction(item);
    }, [item, resetAction]);

    return (
        <div className={css.container}>
            <ResizableWrapper>
                <form ref={ref} onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <FormFieldsRenderer fields={formFields} register={register} errors={errors} item={item}/>
                    <ButtonGroup orientation="horizontal">
                        <Button variant={"outline"} type="submit" disabled={!isValid}>
                            {
                                item?.id &&
                                <PencilSquareIcon className="h-5 w-5"/> ||
                                <PlusCircleIcon className="h-5 w-5"/>
                            }
                        </Button>
                        <Button variant={"outline"} type="button" onClick={() => handleReset(ref)}>
                            <ArrowPathIcon className="h-5 w-5"/>
                        </Button>
                    </ButtonGroup>
                </form>
            </ResizableWrapper>
        </div>
    );
};

export default CarForm;

