"use client";
import { FC, useState, useEffect, useCallback } from "react";
import { IUser, IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import { UserCard } from "@/app/users/(details)/UserCard/UserCard.tsx";
import InfiniteScroll from "@/components/All/InfiniteScroll/InfiniteScroll.tsx";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import UniversalFilter from "@/components/All/UniversalFilter/FilterInput.tsx";
import DialogModal from "@/common/HOC/DialogModal/DialogModal.tsx";
import { useUsersPagination } from "./useUsersPagination.ts";
import { useSearchParams } from "next/navigation";

interface IProps {
    initialData: IUsersResponse;
}

const UsersClient: FC<IProps> = ({ initialData }) => {
    const baseUrl = "/users";
    const searchParams = useSearchParams();
    const limit = searchParams.get("limit");
    const skip = searchParams.get("skip");
    const { uniqueUsers, error, handleNextPage, isFetchingNextPage, hasNextPage, total } = useUsersPagination({
        initialData,
    });

    const [filteredUsers, setFilteredUsers] = useState<IUser[]>(uniqueUsers);

    useEffect(() => {
        setFilteredUsers(uniqueUsers); // Initialize filteredUsers with uniqueUsers
    }, [uniqueUsers]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filterUsers = useCallback((inputValues: { [key in keyof IUser]?: string }) => {
        const filtered = uniqueUsers.filter(user =>
            Object.keys(inputValues).every(key =>
                new RegExp(inputValues[key as keyof IUser] || "", "i").test(String(user[key as keyof IUser]))
            )
        );
        setFilteredUsers(filtered);
    }, [uniqueUsers]);

    return (
        <>
            <div className={"fixed top-[60px] z-50"}>
                <PaginationComponent total={total} baseUrl={baseUrl} />
            </div>
            <div className="w-screen flex items-center justify-center">
                <DialogModal label={"Filters"}>
                    <UniversalFilter<IUser>
                        queryKey={["users", limit, skip]}
                        filterKeys={[
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








