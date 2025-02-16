import React, {FC, ReactNode} from 'react';

interface IProps {
    children: ReactNode
}

const Layout: FC<IProps> = async ({children}) => {
    return (
        <div className={"flex flex-row h-screen w-screen"}>
            <div className={"w-1/3 flex justify-center items-center"}>
                {children}
            </div>
            <div className={"w-2/3 flex justify-start items-start"}>
                ttt
            </div>

        </div>
    );
};

export default Layout;