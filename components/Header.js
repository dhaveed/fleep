import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from "@expo/vector-icons";
import Colors from '../constants/Colors';

export default function Header(props) {
  return (
    <View style={styles.header}>
        {props.left}
      <View>
        <Text style={styles.headerTitle}>{props.title}</Text>
      </View>
      {props.right}
     </View>
  );
}


const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 0.5,
        color: Colors.dark,
    }
})