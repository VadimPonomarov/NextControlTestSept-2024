import React, {FC} from "react";
import {Metadata} from "next";

import {getMetadata} from "./index.metadata";

const Home: FC = async () => {
    return <div>Home</div>;
};

export const metadata: Metadata = await getMetadata({
    title: "Home",
    description: "...",
});

export default Home;
