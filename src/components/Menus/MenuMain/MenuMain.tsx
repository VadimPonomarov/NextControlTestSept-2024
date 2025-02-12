"use client";

import MenuComponent from "@/components/All/MenuComponent/MenuComponent.tsx";
import {signOut, useSession} from "next-auth/react";
import {IMenuItem} from "@/components/All/MenuComponent/menu.interfaces.ts";
import {FaSignOutAlt} from "react-icons/fa";

export const MenuMain = () => {
    const {status} = useSession();

    const handleSignOut = () => {
        const currentUrl = window.location.href;
        signOut({callbackUrl: currentUrl});
    };

    const menuItems: IMenuItem[] = [
        {path: "/", label: "Home", disabled: false},
        {path: "/cars", label: "Cars"},
        {path: "/api/auth/signin", label: "Login", disabled: status === "authenticated"},
        {
            path: "#", // Используем '#' для ссылки, если используется коллбэк
            label: <FaSignOutAlt size={24}/>, // Используем иконку вместо строки
            disabled: status !== "authenticated",
            cb: handleSignOut
        },
    ];

    return <MenuComponent items={menuItems} className={"fixed top-0 left-0"}/>;
};

