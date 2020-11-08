import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import Currencies from "./Currencies";
import Flipper from "./Flipper";
import Header from "../components/Header";

const Stack = createStackNavigator();

const headerOptions = {
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: "transparent",
    elevation: 0,
  },
  headerLeft: null,
  headerTitleContainerStyle: {
    flex: 1,
  },
};

export default function Navigator() {
  const Back = ({ navigation }) => {
    return (
      <Feather
        style={{ position: "absolute", left: 10 }}
        name="chevron-left"
        size={24}
        onPress={() => navigation.goBack()}
      />
    );
  };

  const Info = ({ navigation }) => {
    return (
      <Feather
        style={{ position: "absolute", right: 10 }}
        name="info"
        size={24}
        onPress={() => console.log("Show about modal")}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Flipper"
        component={Flipper}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header title="Fleep Currency" right={<Info navigation={navigation} />} />
            ),
            ...headerOptions,
          };
        }}
        headerMode="none"
      />
      <Stack.Screen
        name="Currencies"
        component={Currencies}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header
                title="Choose a currency"
                left={<Back navigation={navigation} />}
              />
            ),
            ...headerOptions,
          };
        }}
      />
    </Stack.Navigator>
  );
}
