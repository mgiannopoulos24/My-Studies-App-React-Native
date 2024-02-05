import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Login from "./LoginScreen/Login";
import InfoIcon from './InfoIcon/InfoIcon';



export default function App (){
  return (
    <View style={{ position : 'absolute', top : 0, left : 0, right : 0,bottom : 0,}}>
        <Login/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:100,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
