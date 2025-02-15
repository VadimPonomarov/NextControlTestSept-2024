import {FC} from "react";
import {IUserSession, IUsersResponse} from "@/common/interfaces/users.interfaces.ts";
import {getServerSession} from "next-auth/next";
import {authConfig} from "@/configs/auth.ts";
import {baseUrl} from "@/common/constants/constants.ts";
import {Metadata} from "next";
import UsersClient from "@/app/users/UsersClient.tsx";

import styles from "./index.module.css";

const fetchUsers = async (): Promise<IUsersResponse | Error> => {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
        throw new Error('Unauthorized');
    }
    const {accessToken} = session.user as unknown as IUserSession;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(`${baseUrl}/auth/users`, {
        headers,
        cache: "force-cache",
        credentials: "include",
    });

    if (!response.ok) {
        return new Error('Failed to fetch users');
    }

    return response.json();
};

const UsersPage: FC = async () => {
    const response = await fetchUsers() as unknown as IUsersResponse | Error;


    return (
        <div className={styles.absoluteContainer}>
            <div className="w-screen flex items-center justify-center"></div>
            <UsersClient initialData={response}/>
        </div>
    );
};

export const metadata: Metadata = {
    title: "Users",
    description: "...",
};

export default UsersPage;
