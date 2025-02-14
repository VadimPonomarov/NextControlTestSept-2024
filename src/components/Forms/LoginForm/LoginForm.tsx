"use client";
import React, { FC, useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResizableWrapper } from "@/components/All/ResizableWrapper/ResizableWrapper";
import FormFieldsRenderer from "@/components/All/FormFieldsRenderer/FormFieldsRenderer";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/All/ButtonGroup/ButtonGroup.tsx";
import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { IDummyAuth } from "@/common/interfaces/dummy.interfaces.ts";
import { FormFieldsConfig } from "@/common/interfaces/forms.interfaces.ts";
import UsersComboBox from "@/components/UsersComboBox/UsersComboBox.tsx";

import { schema } from "./index.joi";

const formFields: FormFieldsConfig<IDummyAuth> = [
    { name: "username", label: "Username", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "expiresInMins", label: "Expires in Minutes", type: "number" },
];

const LoginForm: FC = () => {
    const [error, setError] = useState<string | null>(null);
    const defaultValues: IDummyAuth = { username: "", password: "", expiresInMins: null };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IDummyAuth>({
        resolver: joiResolver(schema),
        defaultValues,
        mode: "all",
    });

    const onSubmit: SubmitHandler<IDummyAuth> = async (data) => {
        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*", // Разрешаем все источники
                    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS", // Разрешаем все методы
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Разрешаем указанные заголовки
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    expiresInMins: Number(data.expiresInMins),
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();

            // Успешная аутентификация
            console.log("Logged in successfully!", result);

            // Установка сессии в NextAuth
            const res = await fetch("/api/auth/callback/credentials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    expiresInMins: Number(data.expiresInMins),
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to set session in NextAuth");
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
                    <UsersComboBox reset={reset} />
                    <FormFieldsRenderer fields={formFields} register={register} errors={errors} />
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <ButtonGroup orientation="horizontal">
                        <Button variant={"outline"} type="submit" disabled={!isValid}>
                            <PaperAirplaneIcon className="h-5 w-5" />
                        </Button>
                        <Button variant={"outline"} type="button" onClick={() => reset(defaultValues)}>
                            <ArrowPathIcon className="h-5 w-5" />
                        </Button>
                    </ButtonGroup>
                </form>
            </ResizableWrapper>
        </div>
    );
};

export default LoginForm;





