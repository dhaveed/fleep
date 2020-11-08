import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
// import { styles } from '../styles';

const CURRENCIES = [
  {
    id: 1,
    name: "United States Dollar",
    shortcode: "USD"
  },
  {
    id: 2,
    name: "Australian Dollar",
    shortcode: "AUD"
  },
  {
    id: 3,
    name: "Bulgarian Lev",
    shortcode: "BGN"
  },
  {
    id: 4,
    name: "Brazilian Real",
    shortcode: "BRL"
  },
  {
    id: 5,
    name: "Canadian Dollar",
    shortcode: "CAD"
  },
  {
    id: 6,
    name: "Czech Koruna",
    shortcode: "CZK"
  },
  {
    id: 7,
    name: "Danish Krone",
    shortcode: "DKK"
  },
  {
    id: 8,
    name: "Euro",
    shortcode: "EUR"
  },
  {
    id: 9,
    name: "British Pound",
    shortcode: "GBP"
  },
  {
    id: 10,
    name: "Hungarian Forint",
    shortcode: "HUF"
  },
];

export default function Currencies() {

  const [selected, setSelected] = useState(2);

  const Search = () => {
    return (
      <View style={styles.searchWrap}>
        <Feather name="search" size={24} color={Colors.light} />
        <TextInput
          placeholder="Currency name or shortcode"
          // placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor={Colors.light}
          keyboardAppearance="default"
          returnKeyType="done"
          autoCorrect={false}
        />
      </View>
    );
  };

  const Currency = ({ item }) => {
    return (
      <TouchableOpacity style={styles.currency} activeOpacity={0.4} onPress={() => setSelected(item.id)}>
        <View style={styles.currencyFlag}></View>
        <Text style={styles.currencyShortcode}>
          {item.shortcode}
        </Text>
        <Text style={styles.currencyName}>
          {item.name}
        </Text>
        {selected == item.id && (<Feather name="check" size={18} color={Colors.primary} />)}
      </TouchableOpacity>
    )
  };

  const RecentCurrencies = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Recent Currencies
        </Text>
        <Currency item={{ name: "British Pound", shortcode: "GBP" }} />
        <Currency item={{ name: "Euro", shortcode: "EUR" }} />
      </View>
    )
  };
  
  const AllCurrencies = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          All Currencies
        </Text>
        {CURRENCIES.map((item) => (
          <Currency item={item} key={item.id} />
        ))}
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Search />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RecentCurrencies />
        <AllCurrencies />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 30,
    paddingTop: 10,
  },
  searchWrap: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.pale,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 15,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontWeight: "800",
    color: Colors.muted,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  currency: {
    marginVertical: 12.5,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 25,
    borderBottomWidth: 1.2,
    borderBottomColor: Colors.muted + "60",
  },
  currencyFlag: {
    width: 35,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  currencyShortcode: {
    marginLeft: 12,
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: "800",
    color: Colors.dark,
    textTransform: "uppercase",
  },
  currencyName: {
    marginLeft: 12,
    flex: 1,
    fontSize: 16,
    letterSpacing: 0.6,
    color: Colors.dark,
  },
});
