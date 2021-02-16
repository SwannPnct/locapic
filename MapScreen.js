import React from 'react';
import {View,Text, Button} from 'react-native';

export default function MapScreen(props) {
    const inlineStyle = {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: "#F1F2F5"
    }

    return (
        <View style={inlineStyle}>
            <Text>Map Screen</Text>
        </View>
    )
}