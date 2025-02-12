import "./globals.css";
import {MenuMain} from "@/components/Menus/MenuMain/MenuMain";
import React from "react";
import RootProvider from "@/common/providers/RootProvider";
import {PageTracker} from "react-page-tracker";
import ThemeToggle from "@/components/All/ThemeToggle/ThemeToggle.tsx";
import AuthBadge from "@/components/All/AuthBadge/AuthBadge.tsx";

import {geistMono, geistSans} from "./constants";
import css from "./index.module.css";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <RootProvider>
            <div className={css.main}>
                <PageTracker/>
                <MenuMain/>
                <span className={"fixed right-[50px] top-2 z-50"}>
                    <AuthBadge/>
                </span>
                <ThemeToggle/>
                {children}
            </div>
        </RootProvider>
        </body>
        </html>
    );
}
