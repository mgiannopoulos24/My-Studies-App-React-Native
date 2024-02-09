import React from 'react';
import { StyleSheet, View} from 'react-native';
import Login from "./LoginScreen/Login";
import MainStud from './MainPage/MainStud';




export default function App (){
  return (
    <View style={{ position : 'absolute', top : 0, left : 0, right : 0,bottom : 0,}}>
        {/* <Login/> */}
        <MainStud/>
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
