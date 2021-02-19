import React, { useEffect, useState } from 'react';
import {View,Text, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';
import {ListItem, Input,Button} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

import {connect} from 'react-redux';

import {socket} from './App'


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
        width: "100%",
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

function ChatScreen(props) {

    const [currentMessage, setCurrentMessage] = useState(null);
    const [listMessage, setListMessage] = useState([]);
   
    useEffect(() => {
        
        socket.on("sendMessageToAll", (obj) => {
            const emojis = [{regex: /:\)/gi, unicode: "\u263A"},{regex: /:\(/gi, unicode: "\u2639"},{regex: /:p/gi, unicode: "\uD83D\uDE1B"}]
            emojis.forEach((e) => obj.message = obj.message.replace(e.regex,e.unicode))
            setListMessage([...listMessage, obj])
        })
    } ,[listMessage])
    
    const handleSendMessage = () => {
        if (currentMessage) {
            const checkProfanity = /[a-z]*fuck[a-z]*/gi;
            const filteredMessage = currentMessage.replace(checkProfanity, "***")
            socket.emit("sendMessage", {pseudo: props.pseudo, message: filteredMessage})
            setCurrentMessage(null)
        }
    }
    
    const generateList = listMessage.map((e,idx) => 
    (
        <ListItem key={idx} bottomDivider style={styles.message}>
        <ListItem.Content>
          <ListItem.Title>{e.message}</ListItem.Title>
          <ListItem.Subtitle>{e.pseudo}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )   )

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <ScrollView style={{flex:1}}>
                    {generateList.length > 0 ? generateList : <Text>"No messages"</Text>}
                </ScrollView>
            </View>
            <KeyboardAvoidingView style={styles.inputContainer} behavior="padding" enabled>
                <Input placeholder="Your message" onChangeText={(e) => setCurrentMessage(e)} value={currentMessage}></Input>
                <Button buttonStyle={styles.button} icon={<AntDesign name="mail" size={24} color="white" />} title=" Send" onPress={() => handleSendMessage()}></Button>
            </KeyboardAvoidingView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        pseudo: state.pseudo
    }
}

export default connect(mapStateToProps, null)(ChatScreen)