import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IProps, IResponse } from "./index.interfaces";

/**
 * useUniversalFilter
 * @param {Object} props - Input parameters
 * @param {string[]} props.queryKey - Key for querying data from react-query
 * @param {Array<keyof T>} props.filterKeys - Array of object keys of type T, which will be used for filtering data
 * @param {keyof IResponse<T>} props.targetArrayKey - Key in the IResponse<T> object that contains the array of data to be filtered
 * @param {(filtered: T[]) => void} props.cb - Callback function that is called with the filtered data
 */
const useUniversalFilter = <T>({
                                   queryKey,
                                   filterKeys,
                                   targetArrayKey,
                                   cb,
                               }: IProps<T>) => {
    const [inputValues, setInputValues] = useState<{ [key in keyof T]?: string }>({});
    const queryClient = useQueryClient();

    useEffect(() => {
        // Fetch data from the query client
        const data = queryClient.getQueryData<IResponse<T>>(queryKey);

        // Filter the data based on input values
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

    // Handle input change event for filters
    const handleInputChange = (key: keyof T, value: string) => {
        setInputValues(prev => ({ ...prev, [key]: value }));
    };

    // Handle focus event for input fields
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select();
    };

    // Reset all input values
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
