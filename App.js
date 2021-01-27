import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import ConversionContext from "./components/Converter/Converter";
import Currencies from "./screens/Currencies";
import Navigator from "./screens/Navigator";
import { styles } from "./styles";

export function conversionPairReducer(state, item) {
  return {...state};
}

export default function App() {
  const [allCurrencies, setAllCurrencies] = useState([]);

  const initialPair = {
    base: { 
      name: "United States",
      currency: "USD",
      unicodeFlag: "🇺🇸"
    },
    target: {
      name: "United Kingdom",
      currency: "GBP",
      unicodeFlag: "🇬🇧",
    },
  };

  const [conversionPair, setConversionPair] = useState(initialPair);

  useEffect(() => {
    getAllCurrencies();
  }, []);

  const getAllCurrencies = async () => {
    let req = await fetch(
      "https://countriesnow.space/api/v0.1/countries/info?returns=currency,unicodeFlag"
    );
    let res = await req.json();
    setAllCurrencies(!!res.data && res.data);
  };

  let conversion = {
    allCurrencies: allCurrencies,
  };

  return (
    <ConversionContext.Provider
      value={{ conversion, conversionPair, setConversionPair }}
    >
      <NavigationContainer>
        <Navigator />
        <StatusBar style="dark-content" />
      </NavigationContainer>
    </ConversionContext.Provider>
  );
}

/*
  Time Tracking
  • Day 1 :=> approx 4 hours
  * Day 2 :=> 11:05 - 12:09

  https://restcountries.eu/#api-endpoints-all
  https://restcountries.eu/rest/v2/all
  https://restcountries.eu/rest/v2/currency/ngn
*/
