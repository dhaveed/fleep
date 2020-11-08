import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import Currencies from "./Currencies";
import Flipper from "./Flipper";
import Header from "../components/Header";

const Stack = createStackNavigator();

export default function Navigator() {
  const Back = ({ navigation }) => {
    return (
      <Feather
        style={{ position: "absolute", left: 0 }}
        name="chevron-left"
        size={24}
        onPress={() => navigation.goBack()}
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
              <Header title="Fleep" left={<Back navigation={navigation} />} />
            ),
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: "transparent",
            },
            headerLeft: null,
            headerTitleContainerStyle: {
              flex: 1,
            },
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
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: "transparent",
            },
            headerLeft: null,
            headerTitleContainerStyle: {
              flex: 1,
            },
          };
        }}
      />
    </Stack.Navigator>
  );
}
