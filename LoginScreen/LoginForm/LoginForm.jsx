import React, {useState} from "react";
import { View, StyleSheet,TextInput} from 'react-native';

const LoginForm=()=>{
    const [text, setText] = useState('');
    const onChangeText = newText => {
        setText(newText);
    };
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Κωδικός"
                secureTextEntry={true}
            />

        </View>
    )
}

const styles= StyleSheet.create({
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


export default LoginForm;