import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Currencies from './Currencies';
import Flipper from './Flipper';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Flipper" component={Flipper} />
        <Stack.Screen name="Currencies" component={Currencies} />
    </Stack.Navigator>
  );
}
