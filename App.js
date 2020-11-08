import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import Currencies from './screens/Currencies';
import { styles } from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Currencies />
      <StatusBar style="dark-content" />
    </View>
  );
}