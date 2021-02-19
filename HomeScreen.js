import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View,Text, StyleSheet, ImageBackground} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor:"#3E89D6", 
        color: "white",
        width: "75%"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    input: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center"
    }
});

function HomeScreen(props) {

    const [pseudo, setPseudo] = useState(null);
    const [pseudoSaved, setPseudoSaved] = useState(false)

    const handleGo = () => {
        if(pseudo) {
            props.handleSavePseudo(pseudo); 
            AsyncStorage.setItem("pseudo", pseudo)
            props.navigation.navigate("MapChat")
        }
    }

    useEffect(() => {
        AsyncStorage.getItem("pseudo", (err,data) => {
            if(err) {
                console.log(err);
            } else {
                if(data) {
                    setPseudo(data)
                    setPseudoSaved(true)
                }
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={require('./assets/home.jpg')}>
                <View style={styles.input}>
                    { pseudoSaved ? <Text>Welcome back {pseudo}</Text> : <Input placeholder="Name" leftIcon={<FontAwesome name="user" size={24} color="red" />} onChangeText={(value) => setPseudo(value)} value={pseudo}></Input>}
                    <Button icon={<FontAwesome name="arrow-right" size={20} color="red" />} title=" Go to Map" buttonStyle={styles.button}  onPress={() => handleGo()}/>
                </View>
            </ImageBackground>
            
        </View>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        handleSavePseudo: (pseudo) => {
            dispatch({type:"savePseudo", pseudo})
        }
    }
}

export default connect(null, mapDispatchToProps)(HomeScreen)