import { IUserResponse, IUserSession, IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/configs/auth.ts";
import { baseUrl } from "@/common/constants/constants.ts";

export const fetchUsers = async (params?: Record<string, string>): Promise<IUsersResponse | Error> => {
    try {
        const session = await getServerSession(authConfig);
        if (!session || !session.user) {
            throw new Error('Unauthorized');
        }
        const { accessToken } = session.user as unknown as IUserSession;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const urlSearchParams = new URLSearchParams(params).toString();
        const response = await fetch(`${baseUrl}/auth/users?${urlSearchParams}`, {
            headers,
            cache: "force-cache",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Error('Failed to fetch users');
    }
};

export const fetchUserById = async (id: string): Promise<IUserResponse | Error> => {
    try {
        const session = await getServerSession(authConfig);
        if (!session || !session.user) {
            throw new Error('Unauthorized');
        }
        const { accessToken } = session.user as unknown as IUserSession;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch(`${baseUrl}/auth/users/${id}`, {
            headers,
            cache: "force-cache",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Error('Failed to fetch user');
    }
};
