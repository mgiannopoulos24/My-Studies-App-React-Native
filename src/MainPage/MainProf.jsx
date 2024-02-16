import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from '@react-navigation/native';
import {useDrawer} from '../Drawers/DrawerContext';
import DrawerProf from '../Drawers/DrawerProf';

const MainProf = () => {
  const navigation = useNavigation();
  const { toggleDrawer } = useDrawer();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={toggleDrawer} style={styles.iconContainer}>
            <Icon name="bars" size={30} color="black" style={{paddingLeft:"30px"}} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Αρχική Σελίδα</Text>
            </View>
        </View>
        
        <View style={styles.content}>
            {/* Your main content goes here */}
            <Text>Main Content Goes Here</Text>
        </View>
        <DrawerProf /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Ensure the position context for zIndex
  },
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'lightgray',
  },
  iconContainer: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: '95%',
    justifyContent: 'center',
    paddingLeft: 40,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
    zIndex: 1, // Ensure content stays below drawer
  },
});

export default MainProf;
