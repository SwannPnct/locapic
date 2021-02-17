import React from 'react';
import {View,Text, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';
import {ListItem, Input,Button} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between', 
        marginTop: "20%",
        backgroundColor: "#F1F2F5"
    },
    messageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
        width: "100%"
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end",
        width: "100%"
    },
    message: {
        width: Dimensions.get('window').width
    },
    button: {
        width: Dimensions.get('window').width,
        backgroundColor: "#FF4545",
        color: "white"
    }
})

export default function ChatScreen(props) {

    const listData = [
        {
            name: "Alex",
            message : "Parfait et toi?"
        },
        {
            name: "Johnny",
            message : "Allumez le feu"
        }
    ]

    const generateList = listData.map((e,idx) => 
    (
        <ListItem key={idx} bottomDivider style={styles.message}>
        <ListItem.Content>
          <ListItem.Title>{e.message}</ListItem.Title>
          <ListItem.Subtitle>{e.name}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )   )

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <ScrollView style={{flex:1}}>
                    {generateList}
                </ScrollView>
            </View>
            <KeyboardAvoidingView style={styles.inputContainer} behavior="padding" enabled>
                <Input placeholder="Your message"></Input>
                <Button buttonStyle={styles.button} icon={<AntDesign name="mail" size={24} color="white" />} title=" Send"></Button>
            </KeyboardAvoidingView>
        </View>
    )
}