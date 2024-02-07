import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, ImageBackground } from 'react-native';
import logo_img from "./assets/ekpa-logo.png";
import LoginForm from './LoginForm/LoginForm';
import SignupForm from './SignupForm/SignupForm';

const Login = () => {
  const { width,height} = Dimensions.get('window');

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleInstitutionalLogin = () => {
    setShowLoginForm(prevState => !prevState);
  };

  const [showSignupForm,setShowSignupForm]= useState(false);
  
  const handleAccountCreation=()=>{
    setShowSignupForm(prevState => !prevState);
  } 


  return (
    <ImageBackground source={require('./assets/DIT3.jpg')}  style={{...styles.backgroundImage, width,height}}>
      <View style={styles.container}>
        <Text style={styles.title}>Γραμματείες Πανεπιστημίου Αθηνών</Text>
        <Image source={logo_img} style={styles.image} />
        <Text style={styles.paragraph}>Σύνδεση με:</Text>
        <TouchableOpacity style={styles.button} onPress={handleInstitutionalLogin}>
          <Text style={styles.buttonText}>Ιδρυματικό Λογαριασμό</Text>
        </TouchableOpacity>
        {showLoginForm && (
          <View style={styles.loginFormContainer}>
            <LoginForm />
          </View>
        )}
        <View style={styles.hr} />
        <Text style={styles.paragraph}>Αν δεν έχετε ιδρυματικό λογαριασμό:</Text>
        <TouchableOpacity style={{...styles.button, ...styles.outlinedButton}}  onPress={handleAccountCreation}>
          <Text style={{ ...styles.buttonText, ...styles.outlinedButtonText }}>Δημιουργία Λογαριασμού</Text>
        </TouchableOpacity>
        {showSignupForm && (
          <View style={styles.signupFormContainer}>
            <SignupForm />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop:40,
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
    marginBottom: 70,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight:'bold'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
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
  outlinedButton: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'blue',
  },
  outlinedButtonText: {
    color: 'black',
  },
  loginFormContainer: {
    width: "90%",
    alignItems: 'center',
  },
  signupFormContainer: {
    width: 100,
    alignItems: 'center',
  },
});

export default Login;
