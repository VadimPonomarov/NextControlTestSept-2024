import React, {FC} from "react";
import CarForm from "@/components/Forms/CarForm/CarForm";
import {Metadata} from "next";

import css from "./index.module.css";

interface PageProps {
    params: Promise<{ id: string }>
}

const Cars: FC<PageProps> = async () => {
    return (
        <div className={css.main}>
            <CarForm/>
        </div>
    );
};

export default Cars;


export async function generateMetadata(
    {params}: PageProps
): Promise<Metadata> {
    const id = (await params).id

    return {
        title: id,
    }
}

