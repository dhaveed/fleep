import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import Currencies from "./screens/Currencies";
import Navigator from "./screens/Navigator";
import { styles } from "./styles";

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
      <StatusBar style="dark-content" />
    </NavigationContainer>
  );
}
