import { IRecipeResponse } from "@/common/interfaces/recipe.interfaces";
import { baseUrl, getAuthorizationHeaders } from "@/common/constants/constants";
import {redirect} from "next/navigation";

export async function fetchRecipes(params?: Record<string, string>) {
    const urlSearchParams = new URLSearchParams(params).toString();
    const headers = await getAuthorizationHeaders();

    const fullUrl = `${baseUrl}/auth/recipes?${urlSearchParams}`;
    console.log('Fetching recipes from URL:', fullUrl);

    const response = await fetch(fullUrl, {
        headers,
        method: 'GET',
    });

    if (response.status === 401) {
        console.error('Error response: Unauthorized');
        return redirect('/api/auth');
    }

    if (!response.ok) {
        console.error('Error response:', response.statusText);
        throw new Error('Error fetching recipes');
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to parse JSON response:', error);
        throw new Error('Failed to parse JSON response');
    }
}

export const fetchRecipeById = async (id: string): Promise<IRecipeResponse> => {
    const headers = await getAuthorizationHeaders();

    const fullUrl = `${baseUrl}/auth/recipes/${id}`;
    console.log('Fetching recipe by ID from URL:', fullUrl);

    const response = await fetch(fullUrl, {
        headers,
        method: 'GET',
    });

    if (response.status === 401) {
        console.error('Error response: Unauthorized');
        return redirect('/api/auth');
    }

    if (!response.ok) {
        console.error('Error response:', response.statusText);
        throw new Error(`Failed to fetch recipe: ${response.statusText}`);
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to parse JSON response:', error);
        throw new Error('Failed to parse JSON response');
    }
};
