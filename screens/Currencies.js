import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useContext } from "react";
import ConversionContext from "../components/Converter/Converter";
import { useEffect } from "react";

export default function Currencies({ route }) {
  const [selected, setSelected] = useState({});
  const [filtered, setFiltered] = useState(null);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    if (route.params) {
      var currency = { ...route.params };
      delete currency.type;
      setSelected(currency);
    }
  }, []);

  const { conversion } = useContext(ConversionContext);
  const { conversionPair } = useContext(ConversionContext);
  const { setConversionPair } = useContext(ConversionContext);
  let currencyList = conversion.allCurrencies.sort(function (a, b) {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  const allCurrencies = currencyList.filter((item) => {
   return 'currency' in item && item;
  });

  const doFilter = (param) => {
    setSearchParam(param);
    const result = allCurrencies.filter((item) => {
      const itemData = `${item.name.toLowerCase()}`;
      const currencyData = `${item.currency.toLowerCase()}`;
      const textData = param.toLowerCase();
      // return itemData.indexOf(textData) > -1;
      return (itemData.indexOf(textData) > -1) || (currencyData.indexOf(textData) > -1);
    });
    setFiltered(result);
  };

  const pickCurrency = (item) => {
    setSelected(item);
    if (route.params.type === "base") {
      setConversionPair({
        ...conversionPair,
        base: item,
      });
    } else {
      setConversionPair({
        ...conversionPair,
        target: item,
      });
    }
  };

  const Currency = (item) => {
    return (
      <TouchableOpacity
        style={styles.currency}
        activeOpacity={0.4}
        onPress={() => pickCurrency(item)}
      >
        <View style={styles.currencyFlag}>
          <Text style={{ fontSize: 26, marginTop: -1 }}>
            {item.unicodeFlag}
          </Text>
        </View>
        <Text style={styles.currencyShortcode}>{item.currency}</Text>
        <Text style={styles.currencyName}>{item.name}</Text>
        {selected.name == item.name && (
          <Feather name="check" size={18} color={Colors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  const RecentCurrencies = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Currencies</Text>
        <Currency item={{ name: "British Pound", shortcode: "GBP" }} />
        <Currency item={{ name: "Euro", shortcode: "EUR" }} />
      </View>
    );
  };

  const AllCurrencies = () => {
    return (
      <View style={[styles.section, { flex: 1 }]}>
        <Text style={styles.sectionTitle}>All Currencies</Text>
        <FlatList
          data={searchParam.length === 0 ? allCurrencies : filtered}
          renderItem={({ item, index }) => Currency(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <Feather name="search" size={18} color={"#000"} />
        <TextInput
          placeholder="Country name or currency code..."
          style={styles.searchInput}
          placeholderTextColor={"#30475e50"}
          // returnKeyType="done"
          autoCorrect={false}
          value={searchParam}
          onChangeText={(val) => doFilter(val)}
        />
        {searchParam.length > 0 && (
          <AntDesign
            name="closecircle"
            color={Colors.muted}
            size={16}
            onPress={() => setSearchParam("")}
          />
        )}
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <RecentCurrencies />
        <AllCurrencies />
      </ScrollView> */}
      <AllCurrencies />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  searchWrap: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#f5f4f4",
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
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
    // backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
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

/*

  TODOs

  [x] Integrate live data (currency list)
  [x] Currency Filter
  [x] Handle incoming route params
  [x] Handle currency selection with live data
  [x] Reorder API currencies
  [] Implement recent currencies array
*/
