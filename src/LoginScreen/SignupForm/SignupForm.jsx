import React, {useState} from "react";
import { View, StyleSheet,TextInput,Button} from 'react-native';
import { useAuthContext } from '../../Firebase/AuthProvider';

const SignupForm=()=>{

    const { register } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        register(email, password);
    };

    return(
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
        />
        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Κωδικός"
            secureTextEntry={true}
        />
        <Button title="Εγγραφή" onPress={handleRegister} style={{ width: "50%" }} />
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
})
export default SignupForm;