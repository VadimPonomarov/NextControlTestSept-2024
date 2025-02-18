"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { IRecipe, IRecipesResponse } from "@/common/interfaces/recipe.interfaces.ts";

interface IProps {
    initialData: IRecipesResponse | Error;
}

export const useRecipesPagination = ({ initialData }: IProps) => {
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;
    const total = initialData instanceof Error ? 0 : Number(initialData.total);
    const [uniqueRecipes, setUniqueRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        if (initialData instanceof Error) {
            signOut({ callbackUrl: "/api/auth" });
        }
    }, [initialData]);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<IRecipesResponse>({
        queryKey: ["recipes", limit, skip],
        queryFn: async ({ pageParam = skip }) =>
            await fetch(`/api/recipes?${new URLSearchParams({ limit: String(limit), skip: String(pageParam) })}`).then(res => res.json()),
        getNextPageParam: (lastPage, allPages) => {
            const newSkip = allPages.reduce((acc, page) => acc + (page?.recipes?.length || 0), skip);
            return newSkip < total ? newSkip : undefined;
        },
        initialPageParam: skip,
        initialData: initialData instanceof Error ? undefined : { pages: [initialData], pageParams: [skip] },
        staleTime: 0,
    });

    useEffect(() => {
        const allRecipes = data?.pages.flatMap((page) => page.recipes) || [];
        const validRecipes = allRecipes.filter(recipe => recipe && recipe.id);
        const uniqueRecipes = Array.from(new Set(validRecipes.map(recipe => recipe.id))).map(id => {
            return validRecipes.find(recipe => recipe.id === id);
        });
        setUniqueRecipes(uniqueRecipes);
    }, [data]);

    useEffect(() => {
        if (skip === 0) {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
        }
    }, [skip, queryClient]);

    const handleNextPage = () => {
        fetchNextPage();
    };

    return {
        uniqueRecipes,
        error,
        handleNextPage,
        isFetchingNextPage,
        hasNextPage,
        total,
    };
};


