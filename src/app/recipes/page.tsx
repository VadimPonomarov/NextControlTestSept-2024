import {FC} from "react";
import {Metadata} from "next";
import {IRecipesResponse} from "@/common/interfaces/recipe.interfaces.ts";
import RecipesClient from "@/app/recipes/RecipesClient.tsx";
import {fetchRecipes} from "@/app/api/recipes/helpers.ts";

import styles from "./index.module.css";

const RecipesPage: FC = async () => {
    let response: IRecipesResponse;

    try {
        response = await fetchRecipes();
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        response = {total: "0", skip: "0", limit: "0"} as IRecipesResponse;
    }

    return (
        <div className={styles.absoluteContainer}>
            <div className="w-screen flex items-center justify-center"></div>
            <RecipesClient initialData={response}/>
        </div>
    );
};

export const metadata: Metadata = {
    title: "Recipes",
    description: "...",
};

export default RecipesPage;

