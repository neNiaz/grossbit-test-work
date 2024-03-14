import { FC } from "react";
import styles from "./subtitle.module.scss";

interface Props {
  text: string;
}

export const Subtitle: FC<Props> = ({ text }) => {
  return <span className={styles.container_text}>{text}</span>;
};
