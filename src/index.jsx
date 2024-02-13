import { View,Text,StyleSheet } from "react-native";
import React, {useState} from "react";
import {db} from "./Firebase/firebaseConfig";
import {ref,set} from "firebase/database";

const FetchData=()=>{
    return(
        <View style={styles.container}>
            <Text>FetchData</Text>
        </View>
    )
}

export default FetchData;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    }
});