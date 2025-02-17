import React from 'react';
import {IUserResponse} from "@/common/interfaces/users.interfaces.ts";
import {Metadata} from "next";
import UserDetailsComponent from "@/app/users/(details)/UserDetails/UserDetailsComponent.tsx";
import {fetchUserById} from "@/app/api/users/helpers.ts";


interface IProps {
    params: Promise<{ id: string }>
}

const UserDetails = async ({params}: IProps) => {
    const {id} = await params
    const user = await fetchUserById(id) as unknown as IUserResponse
    if (user instanceof Error) return null
    return (
        <UserDetailsComponent user={user}/>
    )
};

export async function generateMetadata({params}: IProps,): Promise<Metadata> {
    const id = (await params).id
    return {
        title: `${id} Details`,
        description: "..."
    }
}

export default UserDetails;