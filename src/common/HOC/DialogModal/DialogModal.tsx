import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { FC } from "react";

import styles from "./index.module.css";

interface IProps {
  children?: React.ReactNode;
  label?: string;
}

const DialogModal: FC<IProps> = ({ children, label = "Open" }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={styles.button} variant="link">
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
