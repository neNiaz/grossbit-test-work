import { CustomInput } from "../custom-input/custom-input.tsx";
import { useEffect, useState } from "react";
import {
  conversionResultStore,
  initiateConversion,
} from "../../pages/converter-info/lib/currency-data.ts";
import { useUnit } from "effector-react";
import styles from "./converter-control.module.scss";
import arrows from "../../../assets/arrows.svg";
import { useAnimatedValue } from "../../hooks/useAnimatedValue.ts";
import { currencyList } from "../../constants/list-currency.ts";

export const ConverterControl = () => {
  const [fromValue, setFromValue] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("ETH");
  const conversionResult = useUnit(conversionResultStore);
  const animatedValue = useAnimatedValue(conversionResult.convertedValue);

  useEffect(() => {
    initiateConversion({
      fromCurrency,
      toCurrency,
      value: fromValue,
    });
  }, [fromValue, fromCurrency, toCurrency]);

  const handleFromValueChange = (e) => {
    setFromValue(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className={styles.container}>
      <CustomInput
        value={fromValue}
        onChange={handleFromValueChange}
        onCurrencyChange={handleFromCurrencyChange}
        currencyOptions={currencyList}
        currency={fromCurrency}
      />
      <img src={arrows} alt="->" />
      <CustomInput
        value={animatedValue}
        onChange={() => {}}
        onCurrencyChange={handleToCurrencyChange}
        currencyOptions={currencyList}
        currency={toCurrency}
        readOnly
      />
    </div>
  );
};
