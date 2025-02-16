"use client";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {signOut} from "next-auth/react";
import {IUser, IUsersResponse} from "@/common/interfaces/users.interfaces.ts";
import {apiUsers} from "@/services/apiUsers.ts";

interface IProps {
    initialData: IUsersResponse | Error;
}

export const useUsersPagination = ({initialData}: IProps) => {
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;
    const total = initialData instanceof Error ? 0 : Number(initialData.total);
    const [uniqueUsers, setUniqueUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (initialData instanceof Error) {
            signOut({callbackUrl: "/api/auth"});
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
        queryFn: async ({pageParam = skip}) =>
            await apiUsers.users({limit: String(limit), skip: String(pageParam)}),
        getNextPageParam: (lastPage, allPages) => {
            const newSkip = allPages.reduce((acc, page) => acc + page.users.length, skip);
            return newSkip < total ? newSkip : undefined;
        },
        initialPageParam: skip,
        initialData: initialData instanceof Error ? undefined : {pages: [initialData], pageParams: [skip]},
        staleTime: 0,
    });

    useEffect(() => {
        const allUsers = data?.pages.flatMap((page) => page.users) || [];
        const uniqueUsers = Array.from(new Set(allUsers.map(user => user.id))).map(id => {
            return allUsers.find(user => user.id === id);
        });
        setUniqueUsers(uniqueUsers);
    }, [data]);

    useEffect(() => {
        if (skip === 0) {
            queryClient.invalidateQueries({queryKey: ["users"]});
        }
    }, [skip, queryClient]);

    const handleNextPage = () => {
        fetchNextPage();
    };

    return {
        uniqueUsers,
        error,
        handleNextPage,
        isFetchingNextPage,
        hasNextPage,
        total,
    };
};
