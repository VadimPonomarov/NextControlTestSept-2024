import {baseUrl, getAuthorizationHeaders} from "@/common/constants/constants";
import {IUserResponse} from "@/common/interfaces/users.interfaces.ts";
import {redirect} from "next/navigation";

export async function fetchUsers(params?: Record<string, string>) {
    const urlSearchParams = new URLSearchParams(params).toString();
    const headers = await getAuthorizationHeaders();

    const response = await fetch(`${baseUrl}/auth/users?${urlSearchParams}`, {
        headers,
        method: 'GET',
    });

    if (response.status === 401) {
        console.error('Error response: Unauthorized');
        redirect('/api/auth');
    }

    if (!response.ok) {
        console.error('Error response:', response.statusText);
        throw new Error('Error fetching users');
    }

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error('Failed to parse JSON response');
    }

    return data;
}

export const fetchUserById = async (id: string): Promise<IUserResponse> => {
    const headers = await getAuthorizationHeaders();

    const response = await fetch(`${baseUrl}/auth/users/${id}`, {
        headers,
        method: 'GET',
    });

    if (response.status === 401) {
        console.error('Error response: Unauthorized');
        redirect('/api/auth');
    }

    if (!response.ok) {
        console.error('Error response:', response.statusText);
        throw new Error('Failed to fetch user');
    }

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error('Failed to parse JSON response');
    }

    return data;
};
