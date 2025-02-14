import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

import styles from "./index.module.css";
import { IProps } from "./interfaces";

export const UserCard: FC<IProps> = ({ item }) => {

  return (
    <div className={"relative"}>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>
            {item.id}: {item.firstName} {item.lastName}
          </CardTitle>
          <CardDescription>Age: {item.age}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{item.phone}</p>
        </CardContent>
        <CardFooter>
          <small className={"text-small"}>Username: {item.username}</small>
        </CardFooter>
        <CardFooter>
          <i>
            <p className={"text-small"}>{item.email}</p>
          </i>
        </CardFooter>
      </Card>
    </div>
  );
};
