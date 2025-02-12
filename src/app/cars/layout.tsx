import React, {ReactNode} from 'react';
import {MagicBackButton} from "@/components/ui/magicBackButton.tsx";

interface IProps {
    children: ReactNode
}

const Layout = ({children}: IProps) => {
    return (
        <>
            <span className={"fixed top-[50px] left-2 z-50"}>
                <MagicBackButton variant={"link"}/>
            </span>
            {children}
        </>
    );
};

export default Layout;