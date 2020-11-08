import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export default function Flipper({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Currency Flipper page</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Currencies")} style={{ marginTop: 10 }}>
          <Text style={{ color: "purple" }}>Change currency</Text>
      </TouchableOpacity>
     </View>
  );
}
