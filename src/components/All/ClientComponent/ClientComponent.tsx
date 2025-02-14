"use client"
import React, {FC, ReactNode} from 'react';

interface IProps {
    children: ReactNode
}

const ClientComponent: FC<IProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

export default ClientComponent;