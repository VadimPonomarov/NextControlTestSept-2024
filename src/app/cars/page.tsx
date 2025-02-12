import React, {FC} from "react";
import {Metadata} from "next";
import CarsClient from "@/app/cars/CarsClient";
import {apiCarsService} from "@/app/api/apiCars";
import AddBtnClient from "@/app/cars/AddBtnClient.tsx";

import css from "./index.module.css";


const Cars: FC = async () => {
    const initialData = await apiCarsService.cars();
    return (
        <div className={css.main}>
            <span className={"fixed top-[50px] left-[50%] m-0 p-0 translate-x-[-50%] z-50"}>
                <AddBtnClient
                    variant={"ghost"}
                    pathname={"/cars/create"}
                />
            </span>
            <CarsClient initialData={initialData}/>
        </div>
    );
};

export default Cars;

export const metadata: Metadata = {
    title: "Cars",
    description: "...",
};
