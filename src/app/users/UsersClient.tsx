"use client";
import { FC, useEffect } from "react";
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
    const total = initialData instanceof Error ? 0 : Number(initialData.total);

    useEffect(() => {
        if (initialData instanceof Error) {
            signOut({ callbackUrl: "/api/auth" });
        }
    }, [initialData]);

    const updateUrlParams = (newLimit: number, newSkip: number) => {
        const queryParams = new URLSearchParams({ limit: String(newLimit), skip: String(newSkip) });
        router.replace(`/users?${queryParams.toString()}`);
    };

    useEffect(() => {
        updateUrlParams(limit, skip);
    }, [limit, skip, router]);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<IUsersResponse, Error>({
        queryKey: ["users", limit, skip],
        queryFn: async ({ pageParam = skip }) => await apiUsers.users({ limit: String(limit), skip: String(pageParam) }),
        getNextPageParam: (lastPage, allPages) => {
            const newSkip = allPages.reduce((acc, page) => acc + page.users.length, skip);
            return newSkip < total ? newSkip : undefined;
        },
        initialPageParam: skip,
        initialData: initialData instanceof Error ? undefined : { pages: [initialData], pageParams: [skip] },
        staleTime: 0,
    });

    useEffect(() => {
        if (skip === 0) {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    }, [skip, queryClient]);

    const allUsers = data?.pages.flatMap((page) => page.users) || [];
    const uniqueUsers = Array.from(new Set(allUsers.map(user => user.id))).map(id => {
        return allUsers.find(user => user.id === id);
    });

    const handleNextPage = () => {
        fetchNextPage();
        updateUrlParams(limit, skip + limit);
    };

    const handlePageChange = (newSkip: number) => {
        updateUrlParams(limit, newSkip);
        queryClient.invalidateQueries({ queryKey: ["users"] });
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <PaginationComponent total={total} currentPageSkip={skip} onPageChange={handlePageChange} />
            <InfiniteScroll isLoading={isFetchingNextPage} hasMore={!!hasNextPage} next={handleNextPage}>
                {uniqueUsers.map((user: IUser) => (
                    <div key={user.id}>
                        <UserCard item={user} />
                    </div>
                ))}
            </InfiniteScroll>
        </>
    );
};

export default UsersClient;

