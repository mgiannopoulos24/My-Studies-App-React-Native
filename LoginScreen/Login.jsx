import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, ImageBackground } from 'react-native';
import logo_img from "./assets/ekpa-logo.png";
import backgroundImg from "./assets/DIT3.jpg";

const Login = () => {
  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Γραμματείες Πανεπιστημίου Αθηνών</Text>
        <Image source={logo_img} style={styles.image} />
        <Text style={styles.paragraph}>Connect</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Connect Button</Text>
        </TouchableOpacity>
        <View style={styles.hr} />
        <Text style={styles.paragraph}>Don't Connect</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Don't Connect Button</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop:40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 100,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  hr: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default Login;
