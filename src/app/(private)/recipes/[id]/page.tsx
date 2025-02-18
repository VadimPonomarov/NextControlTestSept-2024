import React from 'react';
import {fetchRecipeById} from "@/app/api/recipes/helpers.ts";
import RecipeDetailsComponent from "@/app/(private)/recipes/(details)/RecipeDetailsComponent/RecipeDetailsComponent.tsx";

interface IProps {
    params: Promise<{ id: string }>
}

const Page = async ({params}: IProps) => {
    const id = (await params).id
    const item = await fetchRecipeById(id)
    return (
        <div>
            <RecipeDetailsComponent item={item}/>
        </div>
    );
};

export default Page;