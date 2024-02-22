import React, {useState} from "react";
import { View, StyleSheet,TextInput, TouchableOpacity , Text } from 'react-native';
import { useAuthContext } from '../../Firebase/AuthProvider';

const SignupForm=()=>{

    const { register } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@di\.uoa\.gr$/; // Regex to match the required email format
        return regex.test(email);
    };

    const handleEmailChange = (email) => {
        setEmail(email);
        setIsValidEmail(validateEmail(email));
    };

    const handleRegister = () => {
        register(email, password);
    };

    return(
        <View style={styles.container}>
        <TextInput
            style={[styles.input, !isValidEmail && styles.errorInput]}
            onChangeText={handleEmailChange}
            value={email}
            placeholder="Email"
        />
        {!isValidEmail && <Text style={styles.errorText}>Το email σας πρέπει να έχει την μορφή sdiXXXXX@di.uoa.gr</Text>}
        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Κωδικός"
            secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Εγγραφή</Text>
            </TouchableOpacity>
        </View>
    </View>

    )
}

const styles=StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor:"white",
        borderRadius:10,
    },
    errorInput: {
        borderColor: 'red', // Change border color for error state
    },
    errorText: {
        marginLeft: 12,
        color: 'red', // Text color for error message
    },
    buttonContainer: {
        alignItems: 'center', // Center the button horizontally
        marginTop: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '30%', // Set the button width to 50%
    },
    buttonText: {
        color: 'white',
        textAlign: 'center', // Center the text inside the button
    },
})
export default SignupForm;