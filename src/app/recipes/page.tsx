import {FC} from "react";
import {IUsersResponse} from "@/common/interfaces/users.interfaces.ts";
import {Metadata} from "next";
import UsersClient from "@/app/users/UsersClient.tsx";
import {fetchRecipes} from "@/app/api/recipes/helpers.ts";

import styles from "./index.module.css";

const UsersPage: FC = async () => {
    const response = await fetchRecipes() as unknown as IUsersResponse | Error;

    return (
        <div className={styles.absoluteContainer}>
            <div className="w-screen flex items-center justify-center "></div>
            <UsersClient initialData={response}/>
        </div>
    );
};

export const metadata: Metadata = {
    title: "Recipes",
    description: "...",
};

export default UsersPage;


