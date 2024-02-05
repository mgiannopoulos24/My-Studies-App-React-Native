import React from 'react';
import { View, StyleSheet } from 'react-native';

const InfoIcon = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Click me</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:"flex",
    backgroundColor: 'lightgray', // Added background color for debugging
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1000,
    borderRadius: 100,
    backgroundColor: 'blue', // Customize the button's background color
    padding: 15,
  },
  buttonText: {
    color: 'white', // Customize the button text color
    textAlign: 'center',
  },
});

export default InfoIcon;
