import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import ConversionContext from "./components/Converter/Converter";
import Currencies from "./screens/Currencies";
import Navigator from "./screens/Navigator";
import { styles } from "./styles";

export default function App() {
  const [allCurrencies, setAllCurrencies] = useState([]); // each should include { flag, code, name, symbol }
  const [initialPair, setInitialPair] = useState();

  let conversion = {
    allCurrencies: allCurrencies,
    base: {
      code: "USD",
      name: "United States Dollar",
    },
    target: {
      code: "GBP",
      name: "British Pound",
    },
    rate: 0.73,
  };

  useEffect(() => {
    // getInitialPair();
    getAllCurrencies();
  }, []);

  const getAllCurrencies = async () => {
    let req = await fetch("https://restcountries.eu/rest/v2/all");
    let res = await req.json();
    var all = [];
    res.map(({ flag, currencies }) => all.push([flag, currencies[0]]));
    setAllCurrencies(all);
    console.log(allCurrencies);
    // res.length > 0 &&
  };

  const getInitialPair = async () => {
    let req = await fetch(
      "https://v6.exchangerate-api.com/v6/14d17e97f094da5cb79b81ef/pair/USD/NGN"
    );
    let res = await req.json();
    if (res.result === "success") {
      conversion.base.code = res.base_code;
      conversion.target.code = res.target_code;
      conversion.rate = res.conversion_rate;
      setInitialPair(res);
    }
    console.log(JSON.stringify(res));
  };

  // console.log(JSON.stringify(conversion));

  return (
    <ConversionContext.Provider value={conversion}>
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
