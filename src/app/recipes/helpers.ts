import {IRecipeResponse} from "@/common/interfaces/recipe.interfaces";
import {baseUrl} from "@/common/constants/constants.ts";
import {getServerSession} from "next-auth/next";
import {authConfig} from "@/configs/auth.ts";
import {IUserSession} from "@/common/interfaces/users.interfaces.ts";

export async function fetchRecipes(params?: Record<string, string>) {
    const {accessToken} = (await getServerSession(authConfig)).user as unknown as IUserSession;
    const urlSearchParams = new URLSearchParams(params).toString();

    const response = await fetch(`${baseUrl}/auth/recipes?${urlSearchParams}`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        credentials: "include"

    });

    return await response.json();
}

export const fetchRecipeById = async (id: string): Promise<IRecipeResponse> => {
    const session = await getServerSession(authConfig);
    if (!session || !(session as unknown as IUserSession).accessToken) {
        throw new Error('Failed to get session or access token');
    }

    const {accessToken} = (session as unknown as IUserSession);


    const response = await fetch(`${baseUrl}/auth/recipes/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Content-Type': 'application/json',
        },
        cache: 'force-cache' as const,
        credentials: 'include' as const,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recipe');
    }

    return response.json();
};
