import React, { useEffect, useState } from 'react';
import {View,Text, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';
import {ListItem, Input,Button} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

import {connect} from 'react-redux';

import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://192.168.1.54:3000')

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

function ChatScreen(props) {

    const [currentMessage, setCurrentMessage] = useState(null);
    const [listMessage, setListMessage] = useState([]);

   
    useEffect(() => {
        socket.on("sendMessageToAll", (obj) => {
            setListMessage([...listMessage, obj])
        })
    }, [])
    useEffect(() => {
        socket.on("sendMessageToAll", (obj) => {
            setListMessage([...listMessage, obj])
        })
    }, [currentMessage])

    console.log(listMessage);
    
  

    const handleSendMessage = () => {
        if (currentMessage) {
            socket.emit("sendMessage", {pseudo: props.pseudo, message: currentMessage})
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