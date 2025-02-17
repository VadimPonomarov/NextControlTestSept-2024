import { IRecipeResponse } from "@/common/interfaces/recipe.interfaces.ts";
import { baseUrl, getAuthorizationHeaders } from "@/common/constants/constants.ts";

export async function fetchUsers(params?: Record<string, string>) {
    const urlSearchParams = new URLSearchParams(params).toString();
    const headers = await getAuthorizationHeaders();

    const response = await fetch(`${baseUrl}/auth/users?${urlSearchParams}`, {
        headers,
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Error fetching recipes');
    }

    return await response.json();
}

export const fetchUserById = async (id: string): Promise<IRecipeResponse> => {
    const headers = await getAuthorizationHeaders();

    const response = await fetch(`${baseUrl}/auth/users/${id}`, {
        headers,
        method: 'GET',
    });

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
