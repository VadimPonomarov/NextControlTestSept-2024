import { IRecipeResponse } from "@/common/interfaces/recipe.interfaces";
import { baseUrl, getAuthorizationHeaders } from "@/common/constants/constants";
import { NextResponse } from 'next/server';
import {redirect} from "next/navigation";

export async function fetchUsers(params?: Record<string, string>) {
    const urlSearchParams = new URLSearchParams(params).toString();
    const headers = await getAuthorizationHeaders();

    const fullUrl = `${baseUrl}/auth/users?${urlSearchParams}`;
    console.log('Fetching users from URL:', fullUrl);

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
        throw new Error('Error fetching users');
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to parse JSON response:', error);
        throw new Error('Failed to parse JSON response');
    }
}

export const fetchUserById = async (id: string): Promise<IRecipeResponse> => {
    const headers = await getAuthorizationHeaders();

    const fullUrl = `${baseUrl}/auth/users/${id}`;
    console.log('Fetching user by ID from URL:', fullUrl);

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
        throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to parse JSON response:', error);
        throw new Error('Failed to parse JSON response');
    }
};
