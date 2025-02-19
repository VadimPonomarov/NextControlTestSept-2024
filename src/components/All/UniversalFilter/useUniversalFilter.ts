import React, {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {IProps, IResponse} from "./index.interfaces";

const useUniversalFilter = <T>({
                                   queryKey,
                                   filterKeys,
                                   targetArrayKey,
                                   cb,
                               }: IProps<T>) => {
    const [inputValues, setInputValues] = useState<{ [key in keyof T]?: string }>({});
    const queryClient = useQueryClient();

    useEffect(() => {
        const data = queryClient.getQueryData<IResponse<T>>(queryKey);

        if (data && Array.isArray(data[targetArrayKey as keyof IResponse<T>])) {
            const filtered = (data[targetArrayKey as keyof IResponse<T>] as T[]).filter(
                user =>
                    filterKeys.every(key =>
                        new RegExp(inputValues[key] || "", "i").test(String(user[key as keyof T])),
                    ),
            );
            cb(filtered);
        }
    }, [inputValues, queryClient]);

    const handleInputChange = (key: keyof T, value: string) => {
        setInputValues(prev => ({...prev, [key]: value}));
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select();
    };

    const handleReset = () => {
        setInputValues({});
    };

    return {
        inputValues,
        handleInputChange,
        handleFocus,
        handleReset
    };
};

export default useUniversalFilter;
