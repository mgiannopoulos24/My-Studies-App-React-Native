import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text } from 'react-native'; // Import Text component
import { useAuthContext } from '../../Firebase/AuthProvider'; 
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, userDBRole } = useAuthContext();
    const navigation=useNavigation();

    const handleSignIn = async () => {
        try {
            // Call the login function with the email and password
            const success = await login(email, password);
            if (success) {
                const userRole = await userDBRole(); // Fetch user role from the database
                if (userRole === 'student') {
                    navigation.navigate('MainStud'); // Redirect to MainStud for student users
                } else if (userRole === 'professor') {
                    navigation.navigate('MainProf'); // Redirect to MainProf for professor users
                }
            } else {
                // Handle login failure
                setErrorMessage('Login failed. Please check your credentials.'); // Set error message
            }
        } catch (error) {
            console.error('Authentication failed:', error);
            setErrorMessage('Authentication failed. Please try again later.'); // Set error message
        }
    };

    const onChangeText = (text, field) => {
        if (field === 'email') {
            setEmail(text);
        } else if (field === 'password') {
            setPassword(text);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeText(text, 'email')}
                value={email}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeText(text, 'password')}
                value={password}
                placeholder="Κωδικός"
                secureTextEntry={true}
            />
            <Button title="Σύνδεση" onPress={handleSignIn} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default LoginForm;
