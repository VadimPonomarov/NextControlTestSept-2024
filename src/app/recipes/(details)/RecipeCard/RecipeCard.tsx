import {FC} from "react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {v4 as uuidv4} from "uuid";
import ArrowButton from "@/components/All/ArrowButton/ArrowButton.tsx";
import ClientComponent from "@/components/All/ClientComponent/ClientComponent.tsx";
import Link from "next/link";

import styles from "./index.module.css";
import {IProps} from "./interfaces.ts";


export const RecipeCard: FC<IProps> = ({item}) => {

    return (
        <div className={"relative"}>
            <span className={"absolute top-5 right-5"}>
                <ArrowButton url={`/recipes/${item.id}`}/>
            </span>
            <Card
                className={styles.card}
            >
                <CardHeader>
                    <CardTitle>
                        {item.id}: {item.name} <br/>
                    </CardTitle>
                    <CardDescription>UserId: {item.userId}</CardDescription>
                    <CardDescription>
                        Tags:
                        <span className={"flex gap-1 flex-wrap mt-2"}>
              {item.tags.map((tag: string) => (
                  <span key={uuidv4()}>
                      <ClientComponent>
                      <Button
                          key={uuidv4()}
                          variant={"outline"}
                          className={"h-auto w-auto p-0"}
                      >
                          <Link href={`/recipes/tags/${tag}`}>
                              {tag}
                          </Link>
                      </Button>
                  </ClientComponent>
                  </span>
              ))}
          </span>
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};
