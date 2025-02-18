"use client";
import { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { IDummyAuth } from "@/common/interfaces/dummy.interfaces.ts";
import { FormFieldsConfig } from "@/common/interfaces/forms.interfaces.ts";

import { schema } from "./index.joi";

export const formFields: FormFieldsConfig<IDummyAuth> = [
    { name: "username", label: "Username", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "expiresInMins", label: "Expires in Minutes", type: "number" },
];

export const useLoginForm = () => {
    const [error, setError] = useState<string | null>(null);
    const defaultValues: IDummyAuth = { username: "", password: "", expiresInMins: null };
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

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

    return {
        register,
        handleSubmit,
        errors,
        isValid,
        reset,
        onSubmit,
        error,
        setError,
        defaultValues,
    };
};
