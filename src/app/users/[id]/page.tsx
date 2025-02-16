import React from 'react';
import {fetchUserById} from "@/app/users/helpers.ts";
import {IUserResponse} from "@/common/interfaces/users.interfaces.ts";
import {Metadata} from "next";
import UserDetails from "@/app/users/(details)/UserDetails/UserDetailsPage.tsx";

interface IProps {
    params: Promise<{ id: string }>
}

const Page = async ({params}: IProps) => {
    const {id} = await params
    const user = await fetchUserById(id) as unknown as IUserResponse
    if (user instanceof Error) return null
    return (
        <UserDetails user={user}/>
    )
};

export async function generateMetadata({params}: IProps,): Promise<Metadata> {
    const id = (await params).id
    return {
        title: `${id} Details`,
        description: "..."
    }
}

export default Page;