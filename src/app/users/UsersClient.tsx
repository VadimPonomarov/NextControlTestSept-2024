"use client";
import { FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IUser, IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import { UserCard } from "@/components/Cards/UserCard/UserCard.tsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiUsers } from "@/services/apiUsers.ts";
import { signOut } from "next-auth/react";
import InfiniteScroll from "@/components/All/InfiniteScroll/InfiniteScroll.tsx";

interface IProps {
    initialData: IUsersResponse | Error;
}

const UsersClient: FC<IProps> = ({ initialData }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = Number(searchParams.get('skip')) || 0;

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
        queryKey: ["users"],
        queryFn: async ({ pageParam = skip }) => await apiUsers.users({ limit: String(limit), skip: String(pageParam) }),
        getNextPageParam: (lastPage, pages) => {
            const newSkip = pages.reduce((acc, page) => acc + page.users.length, 0);
            return lastPage.users.length < limit ? undefined : newSkip;
        },
        initialPageParam: skip,
        initialData: initialData instanceof Error ? undefined : { pages: [initialData], pageParams: [skip] },
        staleTime: 5000,
    });

    useEffect(() => {
        if (data?.pages.length) {
            const newSkip = data.pages.reduce((acc, page) => acc + page.users.length, 0);
            const queryParams = new URLSearchParams({ limit: String(limit), skip: String(newSkip) });
            window.history.replaceState(null, '', `/users?${queryParams.toString()}`);
        }
    }, [data?.pages.length, limit, skip]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <InfiniteScroll
            isLoading={isFetchingNextPage}
            hasMore={!!hasNextPage}
            next={fetchNextPage}
        >
            {data?.pages.map((page, pageIndex) => (
                page.users.map((user: IUser) => (
                    <div key={`${pageIndex}-${user.id}`}>
                        <UserCard item={user} />
                    </div>
                ))
            ))}
        </InfiniteScroll>
    );
};

export default UsersClient;
