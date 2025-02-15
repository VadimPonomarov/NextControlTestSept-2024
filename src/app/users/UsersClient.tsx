"use client";
import { FC, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IUser, IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import { UserCard } from "@/components/Cards/UserCard/UserCard.tsx";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { apiUsers } from "@/services/apiUsers.ts";
import { signOut } from "next-auth/react";
import InfiniteScroll from "@/components/All/InfiniteScroll/InfiniteScroll.tsx";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";

interface IProps {
    initialData: IUsersResponse | Error;
}

const UsersClient: FC<IProps> = ({ initialData }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;
    const total = initialData instanceof Error ? 0 : initialData.total;

    useEffect(() => {
        if (initialData instanceof Error) {
            signOut({ callbackUrl: "/api/auth" });
        }
    }, [initialData]);

    useEffect(() => {
        const queryParams = new URLSearchParams({ limit: String(limit), skip: String(skip) });
        router.replace(`/users?${queryParams.toString()}`);
    }, [skip, limit, router]);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery<IUsersResponse, Error>({
        queryKey: ["users", limit, skip],
        queryFn: async ({ pageParam = skip }) => await apiUsers.users({ limit: String(limit), skip: String(pageParam) }),
        getNextPageParam: (lastPage, allPages) => {
            const newSkip = allPages.reduce((acc, page) => acc + page.users.length, 0);
            return lastPage.users.length < limit ? undefined : newSkip;
        },
        initialPageParam: skip,
        initialData: initialData instanceof Error ? undefined : { pages: [initialData], pageParams: [skip] },
        staleTime: 0,
        keepPreviousData: true,
        onSuccess: () => {
            if (skip !== 0) {
                queryClient.invalidateQueries({ queryKey: ["users"], refetchType: "all" });
            }
        }
    });

    const handleFetchNextPage = async () => {
        await fetchNextPage();
        refetch();
    };

    const allUsers = data?.pages.flatMap((page) => page.users) || [];

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <PaginationComponent total={total} />
            <InfiniteScroll isLoading={isFetchingNextPage} hasMore={!!hasNextPage} next={handleFetchNextPage}>
                {allUsers.map((user: IUser, index) => (
                    <div key={user.id + index}>
                        <UserCard item={user} />
                    </div>
                ))}
            </InfiniteScroll>
        </>
    );
};

export default UsersClient;






