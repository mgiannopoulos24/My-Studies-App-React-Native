import React, {useState} from "react";
import { View, StyleSheet,TextInput} from 'react-native';

const SignupForm=()=>{

    const [text, setText] = useState('');
    const onChangeText = newText => {
        setText(newText);
    };

    return(
        <View>
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
            />
        </View>

    )
}

const styles=StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor:"white",
        borderRadius:10
      },
})
export default SignupForm;