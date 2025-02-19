"use client";
import {FC, useEffect, useState} from "react";
import InfiniteScroll from "@/components/All/InfiniteScroll/InfiniteScroll.tsx";
import {PaginationComponent} from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import {IRecipe, IRecipesResponse} from "@/common/interfaces/recipe.interfaces.ts";
import {RecipeCard} from "@/app/recipes/(details)/RecipeCard/RecipeCard.tsx";
import DialogModal from "@/common/HOC/DialogModal/DialogModal.tsx";
import UniversalFilter from "@/components/All/UniversalFilter/FilterInput.tsx";
import {IUser} from "@/common/interfaces/users.interfaces.ts";
import {useSearchParams} from "next/navigation";

import {useRecipesPagination} from "./useRecipesPagination.ts";

interface IProps {
    initialData: IRecipesResponse | Error;
}

const RecipesClient: FC<IProps> = ({initialData}) => {
    const baseUrl = "/recipes";
    const searchParams = useSearchParams();
    const limit = searchParams.get("limit");
    const skip = searchParams.get("skip");

    const {
        uniqueRecipes,
        error,
        handleNextPage,
        isFetchingNextPage,
        hasNextPage,
        total,
    } = useRecipesPagination({initialData});

    const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>(uniqueRecipes);

    useEffect(() => {
        setFilteredRecipes(uniqueRecipes);
    }, [uniqueRecipes]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filterRecipes = (inputValues: { [key in keyof IUser]?: string }) => {
        const filtered = uniqueRecipes.filter(recipe =>
            Object.keys(inputValues).every(key =>
                new RegExp(inputValues[key as keyof IUser] || "", "i").test(String(recipe[key as keyof IRecipe]))
            )
        );
        setFilteredRecipes(filtered);
    };


    return (
        <>
            <div className={"fixed top-[60px] z-50"}>
                <PaginationComponent total={total} baseUrl={baseUrl}/>
            </div>
            <div className="w-screen flex items-center justify-center">
                <DialogModal label={"Filters"}>
                    <UniversalFilter<IRecipe>
                        queryKey={["recipes", limit, skip]}
                        filterKeys={[
                            "userId",
                            "name",
                            "tags",
                            "cuisine",
                            "cookTimeMinutes"
                        ]}
                        cb={filterRecipes}
                        targetArrayKey="recipes"
                    />
                </DialogModal>
            </div>
            <InfiniteScroll isLoading={isFetchingNextPage} hasMore={!!hasNextPage} next={handleNextPage}>
                {filteredRecipes.map((recipe: IRecipe) => (
                    <div key={recipe.id}>
                        <RecipeCard item={recipe}/>
                    </div>
                ))}
            </InfiniteScroll>
        </>
    );
};

export default RecipesClient;

