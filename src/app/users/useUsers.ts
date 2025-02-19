"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { IUser, IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import { filterItems } from "@/services/filters/filterServices.ts";

interface IProps {
    initialData: IUsersResponse;
}

export const useUsers = ({ initialData }: IProps) => {
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;
    const total = initialData instanceof Error ? 0 : Number(initialData.total);
    const [uniqueUsers, setUniqueUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

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
    } = useInfiniteQuery<IUsersResponse, Error>({
        queryKey: ["users", limit, skip],
        queryFn: async ({ pageParam = skip }) =>
            await fetch(`/api/users?${new URLSearchParams({ limit: String(limit), skip: String(pageParam) })}`).then(res => res.json()),
        getNextPageParam: (lastPage, allPages) => {
            const newSkip = allPages.reduce((acc, page) => acc + (page?.users?.length || 0), skip);
            return newSkip < total ? newSkip : undefined;
        },
        initialPageParam: skip,
        initialData: initialData instanceof Error ? undefined : { pages: [initialData], pageParams: [skip] },
        staleTime: 0,
    });

    useEffect(() => {
        const allUsers = data?.pages.flatMap((page) => page.users) || [];
        const validUsers = allUsers.filter(user => user && user.id);
        const uniqueUsers = Array.from(new Set(validUsers.map(user => String(user.id)))).map(id => {
            return validUsers.find(user => String(user.id) === id);
        }).filter(user => user !== undefined);
        setUniqueUsers(uniqueUsers as IUser[]);
        setFilteredUsers(uniqueUsers as IUser[]); // Initialize filteredUsers with uniqueUsers
    }, [data]);

    useEffect(() => {
        if (skip === 0) {
            queryClient.invalidateQueries({ queryKey: ["users",  skip, limit] });
        }
    }, [skip, limit, queryClient]);

    const handleNextPage = () => {
        fetchNextPage();
    };

    const filterUsers = (inputValues: { [key in keyof IUser]?: string }) => {
        const filtered = filterItems(uniqueUsers, inputValues);
        setFilteredUsers(filtered);
    };

    return {
        uniqueUsers,
        filteredUsers,
        error,
        handleNextPage,
        isFetchingNextPage,
        hasNextPage,
        total,
        filterUsers,
    };
};
