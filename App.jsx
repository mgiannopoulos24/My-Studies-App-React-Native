import React from 'react';
import { StyleSheet, View} from 'react-native';
import Login from "./src/LoginScreen/Login";
import MainStud from './MainPage/MainStud';
import { DrawerProvider } from './Drawers/DrawerContext';
import { NavigationContainer } from '@react-navigation/native';
import FetchData from './src';

export default function App (){
  return (
    <NavigationContainer>
    <DrawerProvider>
    <View style={{ position : 'absolute', top : 0, left : 0, right : 0,bottom : 0,}}>
        {/* <Login/> */}
        <FetchData/>
        {/* <MainStud/> */}
    </View>
    </DrawerProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});
