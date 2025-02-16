"use client";
import { FC } from "react";
import InfiniteScroll from "@/components/All/InfiniteScroll/InfiniteScroll.tsx";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import {IRecipe, IRecipesResponse} from "@/common/interfaces/recipe.interfaces.ts";
import {RecipeCard} from "@/components/Cards/RecipeCard/RecipeCard.tsx";

import { useRecipesPagination } from "./useRecipesPagination.ts";

interface IProps {
    initialData: IRecipesResponse | Error;
}

const RecipesClient: FC<IProps> = ({ initialData }) => {
    const baseUrl = "/recipes";
    const {
        uniqueRecipes,
        error,
        handleNextPage,
        isFetchingNextPage,
        hasNextPage,
        total,
    } = useRecipesPagination({ initialData });

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <PaginationComponent total={total} baseUrl={baseUrl} />
            <InfiniteScroll isLoading={isFetchingNextPage} hasMore={!!hasNextPage} next={handleNextPage}>
                {uniqueRecipes.map((recipe: IRecipe) => (
                    <div key={recipe.id}>
                        <RecipeCard item={recipe} />
                    </div>
                ))}
            </InfiniteScroll>
        </>
    );
};

export default RecipesClient;

