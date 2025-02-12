"use client";
import React, {FC} from "react";
import {store} from "@/store/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SessionProvider} from "next-auth/react";

import {IProps} from ".";

const RootProvider: FC<IProps> = ({children}) => {

    return (
        <SessionProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </Provider>
        </SessionProvider>

    );
};

const queryClient = new QueryClient();

export default RootProvider;
