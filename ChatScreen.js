import React from 'react';
import {View,Text, Button} from 'react-native';
import {generalStyle} from './App';

export default function ChatScreen(props) {
    const inlineStyle = {...generalStyle, backgroundColor: "#F1F2F5"}
    return (
        <View style={inlineStyle}>
            <Text>Chat Screen</Text>
        </View>
    )
}