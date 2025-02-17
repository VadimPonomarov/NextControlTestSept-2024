import {IRecipeResponse} from "@/common/interfaces/recipe.interfaces";
import {baseUrl, headers_CORS} from "@/common/constants/constants.ts";
import {getServerSession} from "next-auth/next";
import {authConfig} from "@/configs/auth.ts";
import {IUserSession} from "@/common/interfaces/users.interfaces.ts";

export async function fetchRecipes(params?: Record<string, string>) {
    const urlSearchParams = new URLSearchParams(params).toString();
    const {accessToken} = (await getServerSession(authConfig)).user as unknown as IUserSession;
    const response = await fetch(`${baseUrl}/auth/recipes?${urlSearchParams}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        credentials: "include"

    });

    return await response.json();
}


export const fetchRecipeById = async (id: string): Promise<IRecipeResponse> => {
    const {accessToken} = (await getServerSession(authConfig)).user as unknown as IUserSession;


    const extras = {
        headers: {
            ...headers_CORS,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'force-cache' as const,
        credentials: 'include' as const,
    };

    const response = await fetch(`${baseUrl}/auth/recipes/${id}`, extras);

    if (!response.ok) {
        throw new Error(`Failed to fetch recipe: ${response.statusText}`);
    }

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error('Failed to parse JSON response');
    }

    return data;
};
