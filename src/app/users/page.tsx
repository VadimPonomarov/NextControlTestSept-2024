import {FC} from "react";
import {IUsersResponse} from "@/common/interfaces/users.interfaces.ts";
import {Metadata} from "next";
import UsersClient from "@/app/users/UsersClient.tsx";

import styles from "./index.module.css";
import {fetchUsers} from "@/app/api/users/helpers.ts";

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
