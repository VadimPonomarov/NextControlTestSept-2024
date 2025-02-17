"use client";
import React, {FC, useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";
import {SubmitHandler, useForm} from "react-hook-form";
import {ResizableWrapper} from "@/components/All/ResizableWrapper/ResizableWrapper";
import FormFieldsRenderer from "@/components/All/FormFieldsRenderer/FormFieldsRenderer";
import {Button} from "@/components/ui/button";
import ButtonGroup from "@/components/All/ButtonGroup/ButtonGroup.tsx";
import {ArrowPathIcon, PaperAirplaneIcon} from "@heroicons/react/16/solid";
import {IDummyAuth} from "@/common/interfaces/dummy.interfaces.ts";
import {FormFieldsConfig} from "@/common/interfaces/forms.interfaces.ts";
import UsersComboBox from "@/app/(private)/users/(details)/UsersComboBox/UsersComboBox.tsx";
import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";

import {schema} from "./index.joi";

const formFields: FormFieldsConfig<IDummyAuth> = [
    {name: "username", label: "Username", type: "text"},
    {name: "password", label: "Password", type: "password"},
    {name: "expiresInMins", label: "Expires in Minutes", type: "number"},
];

const LoginForm: FC = () => {
    const [error, setError] = useState<string | null>(null);
    const defaultValues: IDummyAuth = {username: "", password: "", expiresInMins: null};
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
    } = useForm<IDummyAuth>({
        resolver: joiResolver(schema),
        defaultValues,
        mode: "all",
    });

    const onSubmit: SubmitHandler<IDummyAuth> = async (data) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                username: data.username,
                password: data.password,
                expiresInMins: Number(data.expiresInMins),
                callbackUrl,
            });

            if (result?.url) {
                window.location.href = result.url;
            }
        } catch (error) {

            if (error instanceof Error) {
                console.error("Error during sign in", error.message);
                setError(error.message);
            } else {
                console.error("Unexpected error", error);
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="container">
            <ResizableWrapper>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <UsersComboBox reset={reset}/>
                    <FormFieldsRenderer fields={formFields} register={register} errors={errors}/>
                    {error && <div style={{color: "red"}}>{error}</div>}
                    <ButtonGroup orientation="horizontal">
                        <Button variant={"outline"} type="submit" disabled={!isValid}>
                            <PaperAirplaneIcon className="h-5 w-5"/>
                        </Button>
                        <Button variant={"outline"} type="button" onClick={() => reset(defaultValues)}>
                            <ArrowPathIcon className="h-5 w-5"/>
                        </Button>
                    </ButtonGroup>
                </form>
            </ResizableWrapper>
        </div>
    );
};

export default LoginForm;
