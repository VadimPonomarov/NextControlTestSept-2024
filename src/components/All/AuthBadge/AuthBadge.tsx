"use client"
import React from 'react';
import {useSession} from "next-auth/react";
import {Badge} from "@/components/ui/badge.tsx";
import Link from "next/link";

const AuthBadge = () => {
    const session = useSession()
    return (
        <>
            {session.status === "authenticated" &&
                <Badge variant={"destructive"}>
                    <Link href={"/profile"}>
                        {session.data.user.email}
                    </Link>
                </Badge>}
        </>
    );
};

export default AuthBadge;