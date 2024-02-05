import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => console.log("Button clicked!")}>
        <Text style={styles.buttonText}>Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray', // Added background color for debugging
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1000,
    borderRadius: 100,
    backgroundColor: 'blue', // Customize the button's background color
    padding: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Login;
