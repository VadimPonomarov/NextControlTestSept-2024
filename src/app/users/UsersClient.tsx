"use client";
import { FC } from "react";
import { IUser, IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import { UserCard } from "@/app/users/(details)/UserCard/UserCard.tsx";
import InfiniteScroll from "@/components/All/InfiniteScroll/InfiniteScroll.tsx";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";

import { useUsersPagination } from "./useUsersPagination.ts";

interface IProps {
    initialData: IUsersResponse | Error;
}

const UsersClient: FC<IProps> = ({ initialData }) => {
    const baseUrl = "/users";
    const {
        uniqueUsers,
        error,
        handleNextPage,
        isFetchingNextPage,
        hasNextPage,
        total,
    } = useUsersPagination({ initialData });

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <PaginationComponent total={total} baseUrl={baseUrl} />
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

