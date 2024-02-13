import React from 'react';
import { StyleSheet, View} from 'react-native';
import Login from "./src/LoginScreen/Login";
import MainStud from './src/MainPage/MainStud';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerProvider } from './src/Drawers/DrawerContext';
import { NavigationContainer } from '@react-navigation/native';
import { FirebaseProvider } from './src/Firebase/FirebaseProvider';
import { AuthProvider } from './src/Firebase/AuthProvider';
const Stack = createStackNavigator();

export default function App (){
  return (
    <FirebaseProvider>
      <AuthProvider>
        <NavigationContainer>
          <DrawerProvider>
            <View style={{ position : 'absolute', top : 0, left : 0, right : 0,bottom : 0,}}>
                <Stack.Navigator initialRouteName="Login">
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="MainStud" component={MainStud}/>
                </Stack.Navigator>
            </View>
          </DrawerProvider>
        </NavigationContainer>
      </AuthProvider>
    </FirebaseProvider>
  );
};

const styles = StyleSheet.create({

});
