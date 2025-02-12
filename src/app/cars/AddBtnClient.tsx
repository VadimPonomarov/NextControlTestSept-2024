"use client"
import React, {FC} from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button.tsx";

interface IProps {
    pathname: string,
    query?: { [key: string]: string },
    className?: string,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
}

const AddBtnClient: FC<IProps> = ({pathname, query, variant = "default", className}) => {
    return (
        <Link href={{pathname, query}}>
            <Button className={className} variant={variant}>
                +
            </Button>
        </Link>
    );
};

export default AddBtnClient;
