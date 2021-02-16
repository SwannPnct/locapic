import React from 'react';
import {View,Text, StyleSheet, ImageBackground} from 'react-native';
import { Button, Input } from 'react-native-elements';
import {generalStyle} from './App';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
    button: {
        backgroundColor:"#3E89D6", 
        color: "white"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    input: {

    }
});

export default function HomeScreen(props) {
    const inlineStyle = {...generalStyle, backgroundColor: "#56C1CC"}
    return (
        <View style={inlineStyle}>
            
            <Input placeholder="Name" leftIcon={<FontAwesome name="user-circle" size={24} color="red" />}></Input>
            <Button icon={<FontAwesome name="arrow-right" size={20} color="red" />} title=" Go to Map" buttonStyle={styles.button}  onPress={() => props.navigation.navigate("MapChat")}/>
            
        </View>
    )
}