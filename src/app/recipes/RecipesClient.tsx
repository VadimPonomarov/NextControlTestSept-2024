"use client";
import { FC, useEffect } from "react";
import InfiniteScroll from "@/components/All/InfiniteScroll/InfiniteScroll.tsx";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import { IRecipe, IRecipesResponse } from "@/common/interfaces/recipe.interfaces.ts";
import { RecipeCard } from "@/app/recipes/(details)/RecipeCard/RecipeCard.tsx";
import DialogModal from "@/common/HOC/DialogModal/DialogModal.tsx";
import UniversalFilter from "@/components/All/UniversalFilter/FilterInput.tsx";
import { useSearchParams } from "next/navigation";

import { useRecipes } from "./useRecipes.ts";

interface IProps {
    initialData: IRecipesResponse | Error;
}

const RecipesClient: FC<IProps> = ({ initialData }) => {
    const baseUrl = "/recipes";
    const searchParams = useSearchParams();
    const limit = searchParams.get("limit");
    const skip = searchParams.get("skip");

    const {
        uniqueRecipes,
        filteredRecipes,
        handleNextPage,
        isFetchingNextPage,
        hasNextPage,
        total,
        filterRecipes,
    } = useRecipes({ initialData });

    useEffect(() => {
        filterRecipes({});
    }, [filterRecipes, uniqueRecipes]);


    return (
        <>
            <div className={"fixed top-[60px] z-50"}>
                <PaginationComponent total={total} baseUrl={baseUrl} />
            </div>
            <div className="w-screen flex items-center justify-center">
                <DialogModal>
                    <UniversalFilter<IRecipe>
                        queryKey={["recipes", limit, skip]}
                        filterKeys={[
                            "id",
                            "userId",
                            "name",
                            "tags",
                            "cuisine",
                            "cookTimeMinutes",
                            "mealType",
                            "prepTimeMinutes",
                            "rating",
                            "reviewCount"
                        ]}
                        cb={filterRecipes}
                        targetArrayKey="recipes"
                    />
                </DialogModal>
            </div>
            <InfiniteScroll isLoading={isFetchingNextPage} hasMore={!!hasNextPage} next={handleNextPage}>
                {filteredRecipes.map((recipe: IRecipe) => (
                    <div key={recipe.id}>
                        <RecipeCard item={recipe} />
                    </div>
                ))}
            </InfiniteScroll>
        </>
    );
};

export default RecipesClient;

