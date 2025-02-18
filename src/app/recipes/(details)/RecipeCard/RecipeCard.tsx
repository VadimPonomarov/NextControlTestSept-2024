import {FC} from "react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {v4 as uuidv4} from "uuid";

import styles from "./index.module.css";
import {IProps} from "./interfaces.ts";
import ArrowButton from "@/components/All/ArrowButton/ArrowButton.tsx";


export const RecipeCard: FC<IProps> = async (props) => {
    const item = (await props).item
    return (
        <div className={"relative"}><Card
            className={styles.card}
        >
            <span className={"absolute top-5 right-5"}>
                <ArrowButton url={`/recipes/${item.id}`}/>
            </span>
            <CardHeader>
                <CardTitle>
                    {item.id}: {item.name} <br/>
                </CardTitle>
                <CardDescription>UserId: {item.userId}</CardDescription>
                <CardDescription>
                    Tags:
                    <span className={"flex gap-1 flex-wrap mt-2"}>
              {item.tags.map((tag: string) => (
                  <Button
                      key={uuidv4()}
                      variant={"outline"}
                      className={"h-auto w-auto p-0"}
                  >
                      {tag}
                  </Button>
              ))}
          </span>
                </CardDescription>
            </CardHeader>
        </Card>
        </div>
    );
};
