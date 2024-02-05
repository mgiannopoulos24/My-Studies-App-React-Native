import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Login from "./LoginScreen/Login";
import InfoIcon from './InfoIcon/InfoIcon';



export default function App (){
  return (
    <View style={styles.container}>
        <Login/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Added background color for debugging
  },
});
