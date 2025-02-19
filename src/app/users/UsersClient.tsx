"use client";
import { FC, useEffect } from "react";
import { IUser, IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import { UserCard } from "@/app/users/(details)/UserCard/UserCard.tsx";
import InfiniteScroll from "@/components/All/InfiniteScroll/InfiniteScroll.tsx";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import UniversalFilter from "@/components/All/UniversalFilter/FilterInput.tsx";
import DialogModal from "@/common/HOC/DialogModal/DialogModal.tsx";
import { useSearchParams } from "next/navigation";

import { useUsers } from "./useUsers.ts";

interface IProps {
    initialData: IUsersResponse;
}

const UsersClient: FC<IProps> = ({ initialData }) => {
    const baseUrl = "/users";
    const searchParams = useSearchParams();
    const limit = searchParams.get("limit");
    const skip = searchParams.get("skip");
    const { uniqueUsers, filteredUsers, handleNextPage, isFetchingNextPage, hasNextPage, total, filterUsers, error } = useUsers({
        initialData,
    });

    useEffect(() => {
        filterUsers({}); // Ensure filteredUsers is initialized
    }, [uniqueUsers, filterUsers]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className={"fixed top-[60px] z-50"}>
                <PaginationComponent total={total} baseUrl={baseUrl} />
            </div>
            <div className="w-screen flex items-center justify-center">
                <DialogModal>
                    <UniversalFilter<IUser>
                        queryKey={["users", limit, skip]}
                        filterKeys={[
                            "id",
                            "username",
                            "firstName",
                            "lastName",
                            "email",
                            "age",
                            "gender",
                            "role",
                            "phone",
                        ]}
                        cb={filterUsers}
                        targetArrayKey="users"
                    />
                </DialogModal>
            </div>
            <InfiniteScroll isLoading={isFetchingNextPage} hasMore={!!hasNextPage} next={handleNextPage}>
                {filteredUsers.map((user: IUser) => (
                    <div key={user.id}>
                        <UserCard item={user} />
                    </div>
                ))}
            </InfiniteScroll>
        </>
    );
};

export default UsersClient;

