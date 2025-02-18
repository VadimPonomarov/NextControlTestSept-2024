import {Metadata} from "next";
import {IRecipe, IRecipesResponse} from "@/common/interfaces/recipe.interfaces.ts";
import RecipesClient from "@/app/recipes/RecipesClient.tsx";
import {fetchRecipesByTag} from "@/app/api/recipes/helpers.ts";

import styles from "./index.module.css";
import {RecipeCard} from "@/app/recipes/(details)/RecipeCard/RecipeCard.tsx";

interface IProps {
    params: Promise<{ slot: string }>
}

const RecipesPage = async ({params}: IProps) => {
    const name = (await params).slot
    const response = await fetchRecipesByTag(name) as unknown as IRecipesResponse;

    return (
        <div className={styles.absoluteContainer}>
            <div className="w-screen flex items-center justify-center"></div>
            {response.recipes.map((recipe: IRecipe) => (
                <div key={recipe.id}>
                    <RecipeCard item={recipe}/>
                </div>
            ))}
        </div>
    );
};

export const metadata: Metadata = {
    title: "Recipes",
    description: "...",
};

export default RecipesPage;