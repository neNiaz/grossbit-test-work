import { FC } from "react";
import styles from "./title.module.scss";

interface Props {
  title: string;
}

export const Title: FC<Props> = ({ title }) => {
  return <h1 className={styles.container}>{title}</h1>;
};
