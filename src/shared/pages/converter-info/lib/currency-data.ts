import { createEffect, createEvent, createStore } from "effector";
import axios from "axios";

export const fetchConversionRateFx = createEffect(
  async ({ fromCurrency, toCurrency, value }) => {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${fromCurrency}`,
    );
    const rates = response.data?.data.rates;

    const rateToConvert = rates[toCurrency];
    if (!rateToConvert) {
      throw new Error(`Курс конвертации для ${toCurrency} не найден`);
    }

    const numericRate = parseFloat(rateToConvert);
    const numericValue = parseFloat(value);
    const convertedValue = numericValue * numericRate;

    return {
      fromCurrency,
      toCurrency,
      rate: numericRate,
      convertedValue: convertedValue ? convertedValue.toFixed(4) : "",
    };
  },
);

export const initiateConversion = createEvent<{
  fromCurrency: string;
  toCurrency: string;
  value: string;
}>();

initiateConversion.watch(({ fromCurrency, toCurrency, value }) => {
  fetchConversionRateFx({ fromCurrency, toCurrency, value });
});

export const conversionResultStore = createStore({
  fromCurrency: "",
  toCurrency: "",
  rate: 0,
  convertedValue: "0",
}).on(fetchConversionRateFx.doneData, (_, payload) => payload);
