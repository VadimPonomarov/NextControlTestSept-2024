import React from 'react';
import {Metadata} from "next";
import {fetchRecipeById} from "@/app/api/recipes/helpers.ts";
import {IRecipeResponse} from "@/common/interfaces/recipe.interfaces.ts";
import RecipeDetailsComponent from "@/app/(private)/recipes/(details)/RecipeDetails/RecipeDetailsComponent.tsx";

interface IProps {
    params: Promise<{ id: string }>
}

const RecipeDetails = async ({params}: IProps) => {
    const {id} = await params
    const recipe = await fetchRecipeById(id) as unknown as IRecipeResponse
    return (
        <div className={"w-screen flex justify-center items-center h-[85vh]"}>
            <RecipeDetailsComponent item={recipe}/>
        </div>
    )
};

export async function generateMetadata({params}: IProps,): Promise<Metadata> {
    const id = (await params).id
    return {
        title: `${id} Details`,
        description: "..."
    }
}

export default RecipeDetails;