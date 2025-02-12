"use client";

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DefaultValues, KeepStateOptions, SubmitHandler, UseFormGetValues} from "react-hook-form";
import {ICar, ICarCreate} from "@/common/interfaces/cars.interfaces";
import {useRouter, useSearchParams} from "next/navigation";
import {apiCarsService} from "@/app/api/apiCars";

type IProps<T> = {
    resetAction?: (
        values?: DefaultValues<T> | T,
        keepStateOptions?: KeepStateOptions,
    ) => void;
    item: T;
    setAction?: Dispatch<SetStateAction<T>>;
    getValues?: UseFormGetValues<T>
};

export const useCarForm = ({resetAction, item, setAction, getValues}: IProps<ICar>) => {
    const [formData, setFormData] = useState<ICar | null>(null);
    const router = useRouter();
    const client = useQueryClient();
    const queryParams = useSearchParams();

    useEffect(() => {
        const carData = queryParams.get("car");
        if (carData) {
            try {
                const parsedData = JSON.parse(carData);
                setAction(parsedData);
            } catch (error) {
                console.error("Failed to parse car data:", error);
            }
        }
    }, [queryParams, setAction]);


    const {mutate: create} = useMutation({
        mutationFn: (data: ICarCreate) => apiCarsService.create(data),
        onSuccess: (newCar) => {
            client.setQueryData<ICar[]>(["cars"], (oldCars = []) => [
                ...oldCars,
                newCar,
            ]);
        },
    });

    const {mutate: update} = useMutation({
        mutationFn: (data: ICar) => apiCarsService.updateById(data.id.toString(), data),
        onSuccess: (newCar) => {
            client.setQueryData<ICar[]>(["cars"], (oldCars = []) =>
                oldCars.map((car) => (car.id === newCar.id ? newCar : car)),
            );
        },
    });

    const {mutate: del} = useMutation({
        mutationFn: (id: string) => apiCarsService.deleteById(id),
        onSuccess: () => {
            client.setQueryData<ICar[]>(["cars"], (oldCars = []) =>
                oldCars.filter((car) => car.id !== item.id),
            );
        },
    });

    const onCreate = (data: ICar) => {
        create(data)
        router.push("/cars")
    };

    const onUpdate = (data: ICar) => {
        update(data);
        router.push("/cars")
    };

    const onDelete = () => {
        if (item?.id) {
            del(String(item.id));
        }
    };

    const onSubmit: SubmitHandler<ICar> = (data) => {
        if (data.id) {
            onUpdate(data);
        } else {
            onCreate(data);
        }
    };

    const handleReset = (ref: React.RefObject<HTMLFormElement>) => {
        const id = getValues("id")
        ref.current.reset()
        resetAction({id})
    };

    return {
        formData,
        setFormData,
        onCreate,
        onUpdate,
        onDelete,
        onSubmit,
        handleReset,
    };
};
