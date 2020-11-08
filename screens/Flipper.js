import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import Dash from "react-native-dash";
import Colors from "../constants/Colors";

export default function Flipper({ navigation }) {
  const [value, setValue] = useState(0.0);

  const Currency = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.currency}
        activeOpacity={0.4}
        onPress={() => navigation.navigate("Currencies")}
      >
        <View style={styles.currencyFlag}></View>
        <Text style={styles.currencyShortcode}>{item.shortcode}</Text>
        <Feather name="chevron-down" color={Colors.dark} size={20} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fleeperCard}>
        <View style={styles.fleepWrap}>
          <Text style={styles.fleepTitle}>Source</Text>
          <View style={styles.amountWrap}>
            {/* <Text style={styles.amount}>100.00</Text> */}
            <TextInput
              placeholder="0.00"
              placeholderTextColor={Colors.muted}
              style={[styles.amount, { color: Colors.primary }]}
              keyboardType="decimal-pad"
              value={value}
              onChangeText={(text) => setValue(text)}
            />
            <Dash
              style={styles.dashStyles}
              dashColor={Colors.primary}
              dashGap={3}
            />
          </View>
          <Currency item={{ shortcode: "GBP", id: 1 }} />
        </View>

        <TouchableOpacity
          style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}
        >
          <AntDesign
            name="swap"
            size={24}
            color={Colors.primary}
            style={{ marginLeft: -10 }}
          />
        </TouchableOpacity>

        <View style={styles.fleepWrap}>
          <Text style={styles.fleepTitle}>Target</Text>
          <View style={styles.amountWrap}>
            <Text style={styles.amount}>{(value * 1.1343).toFixed(2)}</Text>
            <Dash
              style={styles.dashStyles}
              dashColor={Colors.muted}
              dashGap={3}
            />
          </View>
          <Currency item={{ shortcode: "EUR", id: 2 }} />
        </View>
      </View>

      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.bodyText, { fontWeight: "700" }]}>
            Conversion Rate &bull;
          </Text>
          <Text style={[styles.bodyText]}>1 GBP &#8776; 1.1343 EUR</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.bodyText}>
            All conversions on Fleep are always instant and completely free of
            charge.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
    width: 30,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  currencyShortcode: {
    marginLeft: 10,
    marginRight: 3,
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: "600",
    color: Colors.dark,
    textTransform: "uppercase",
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