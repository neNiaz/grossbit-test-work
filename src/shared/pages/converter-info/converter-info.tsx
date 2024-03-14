import { ConverterControl, Subtitle, Title } from "../../components";
import styles from "./converter-info.module.scss";

export const ConverterInfo = () => {
  return (
    <div className={styles.container}>
      <Title title={"Конвертация валют"} />
      <ConverterControl />
      <Subtitle text={"Информация актуальна на 14 марта"} />
    </div>
  );
};
