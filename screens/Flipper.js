import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import Dash from "react-native-dash";
import Colors from "../constants/Colors";
import { useContext } from "react";
import ConversionContext from "../components/Converter/Converter";

export default function Flipper({ navigation }) {
  const [baseValue, setBaseValue] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetValue, setTargetValue] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState("GBP");

  const getExchangeRate = async () => {
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

  const { conversion } = useContext(ConversionContext);
  const { conversionPair } = useContext(ConversionContext);
  const { setConversionPair } = useContext(ConversionContext);

  const switchCurrencies = () => {
    let swapped = {
      base: conversionPair.target,
      target: conversionPair.base,
    };
    console.log(swapped);
    setConversionPair(swapped);
  };

  const Currency = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.currency}
        activeOpacity={0.4}
        onPress={() =>
          navigation.navigate("Currencies", {
            ...item
          })
        }
      >
        <View style={styles.currencyFlag}>
          <Text style={{ fontSize: 32, marginTop: -5 }}>{item.flag}</Text>
        </View>
        <View style={styles.currencyMeta}>
          <Text style={styles.currencyShortcode}>{item.shortcode}</Text>
          <Text style={styles.currencyName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const CurrencyCard = ({ item }) => {
    return (
      <View style={styles.currencyCard}>
        <TouchableOpacity style={styles.currencyCardHeading}>
          <View style={styles.currencyCardCurrencyWrap}>
            <Currency
              item={{
                shortcode: item.code,
                id: 2,
                name: item.name,
                flag: item.flag,
                type: item.type
              }}
            />
          </View>
          <View style={styles.currencyCardArrowWrap}>
            <Feather name="chevron-right" color={Colors.primary} size={20} />
          </View>
        </TouchableOpacity>

        <View style={styles.currencyCardInputWrap}>
          <TextInput
            value={"1.00"}
            keyboardType="decimal-pad"
            style={styles.inputStyles}
            placeholder="1.00"
          />
          <Text style={styles.currencySymbol}>$</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewStyles}>
        {/* <Text>{JSON.stringify(conversionPair)}</Text> */}
        <CurrencyCard
          item={{
            name: conversionPair.base.name,
            code: conversionPair.base.currency,
            flag: conversionPair.base.unicodeFlag,
            type: "base"
          }}
        />

        <View style={styles.buttonsWrap}>
          <View style={styles.equalButtonWrap}>
            <FontAwesome5 name="equals" style={styles.equalButtonText} />
          </View>
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.switchButton}
            onPress={() => switchCurrencies()}
          >
            <MaterialIcons name="swap-vert" style={styles.switchButtonIcon} />
            <Text style={styles.switchButtonText}>Switch currencies</Text>
          </TouchableOpacity>
        </View>

        <CurrencyCard
          item={{
            name: conversionPair.target.name,
            code: conversionPair.target.currency,
            flag: conversionPair.target.unicodeFlag,
            type: "target"
          }}
        />

        <View style={{ marginTop: 30 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.bodyText, { fontWeight: "700" }]}>
              Conversion Rate &bull;
            </Text>
            <Text style={[styles.bodyText]}>
              1 {conversionPair.base.currency} &#8776; {conversion.rate}{" "}
              {conversionPair.target.currency}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.bodyText}>
              All conversions on Fleep are always instant and completely free of
              charge.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    // padding: 30,
  },
  scrollViewStyles: {
    padding: 30,
  },
  fleeperCard: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  fleepWrap: {
    alignItems: "flex-start",
    flex: 1,
    // borderWidth: 1,
  },
  fleepTitle: {
    fontWeight: "600",
    textAlign: "center",
    color: Colors.muted,
  },
  amountWrap: {
    marginVertical: 15,
  },
  dashStyles: {
    marginTop: 10,
    maxWidth: 60,
  },
  amount: {
    fontSize: 28,
    color: Colors.dark,
  },
  currencyWrap: {},
  currency: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  currencyFlag: {
    width: 45,
    height: 30,
    borderRadius: 5,
    // backgroundColor: "#eee",
    // alignItems: "center",
    justifyContent: "center",
  },
  bodyText: {
    color: Colors.muted,
    fontWeight: "500",
    lineHeight: 22,
  },
  info: {
    marginTop: 20,
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
  },

  // New currency card styles
  currencyCard: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  currencyCardHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  currencyCardCurrencyWrap: {
    flex: 1,
  },
  currencyMeta: {
    alignItems: "flex-start",
    marginLeft: 0,
  },
  currencyShortcode: {
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: "600",
    color: "#000",
    textTransform: "uppercase",
  },
  currencyName: {
    color: Colors.muted,
    fontWeight: "500",
  },
  currencyCardInputWrap: {
    borderBottomColor: Colors.muted,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  inputStyles: {
    flex: 1,
    fontSize: 30,
    fontWeight: "300",
    marginRight: 8,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.muted,
  },

  // Buttons
  buttonsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30,
  },

  equalButtonWrap: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  equalButtonText: {
    fontSize: 22,
    color: Colors.muted,
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1.2,
    borderColor: Colors.primary + "90",
    borderRadius: 5,
    backgroundColor: Colors.primary + "15",
    alignItems: "center",
  },
  switchButtonIcon: {
    color: Colors.primary,
    fontSize: 22,
    marginRight: 5,
  },
  switchButtonText: {
    color: Colors.primary,
    fontWeight: "700",
  },
});

/*
  TODOs
  [] Handle source currency/value input
  [] Fix target value overflow
  [] Modify colors (to make them more visible)
  [] Implement actual data for conversion
  [] Implement currency switch
  [] Add info modal
*/
