import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button } from 'react-native';


const LoginForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    



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
            <Button title="Σύνδεση" onClick={() => navigation.navigate('MainStud')}/>
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
});

export default LoginForm;
