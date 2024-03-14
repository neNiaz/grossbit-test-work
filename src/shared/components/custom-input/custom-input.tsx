import styles from "./custom-input.module.scss";
import { ChangeEvent, ChangeEventHandler, FC } from "react";
import { CustomSelect } from "../custom-select/custom-select.tsx";

interface Props {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  currency?: string;
  onCurrencyChange?: ChangeEventHandler<HTMLSelectElement>;
  currencyOptions?: { label: string; value: string }[];
  readOnly?: boolean;
}

export const CustomInput: FC<Props> = ({
  currency,
  value,
  onChange,
  onCurrencyChange,
  currencyOptions,
  readOnly,
}) => {
  const handleSelectChange = (newValue: string) => {
    if (onCurrencyChange) {
      onCurrencyChange({
        target: { value: newValue },
      } as ChangeEvent<HTMLSelectElement>);
    }
  };

  return (
    <div className={styles.currency_converter}>
      <input
        className={styles.currency_converter_input}
        placeholder=""
        type={"number"}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
      <CustomSelect
        options={currencyOptions || []}
        selectedValue={currency || ""}
        onChange={handleSelectChange}
      />
    </div>
  );
};
