import React from 'react';
import { StyleSheet, View} from 'react-native';
import Login from "./src/LoginScreen/Login";
import MainStud from './src/MainPage/MainStud';
import MainProf from './src/MainPage/MainProf';
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
        <DrawerProvider>
          <NavigationContainer>
            <View style={{ position : 'absolute', top : 0, left : 0, right : 0,bottom : 0,}}>
                <Stack.Navigator>
                  <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                  <Stack.Screen name='MainStud' component={MainStud} options={{ headerShown: false }}/>
                  <Stack.Screen name='MainProf' component={MainProf} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </View>
          </NavigationContainer>
        </DrawerProvider>        
      </AuthProvider>
    </FirebaseProvider>
  );
};

const styles = StyleSheet.create({

});
