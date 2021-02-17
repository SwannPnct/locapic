import React, {useState, useEffect} from 'react'
import {View,Text, StyleSheet, Dimensions} from 'react-native'
import {Button, Overlay, Input} from 'react-native-elements'
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location'
import {connect} from 'react-redux'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: "#F1F2F5"
    },
    map : {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonPOI: {
        backgroundColor: "#FF4545",
        color: "white",
        width: Dimensions.get('window').width
    },
    overlay : {
        width: "70%"
    },
    buttonOverlay: {
        backgroundColor: "#FF4545",
        color: "white",
    }
})

function MapScreen(props) {

    const [myLatitude, setMyLatitude] = useState(null)
    const [myLongitude, setMyLongitude] = useState(null)

    const [addingPOI, setAddingPOI] = useState(false)
    const [listPOI, setListPOI] = useState([])

    const [overlay, setOverlay] = useState({show: false, index: null})
    const [overlayTitle, setOverlayTitle] = useState(null)
    const [overlayDesc, setOverlayDesc] = useState(null)

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestPermissionsAsync();
            if (status === "granted") {
                await Location.watchPositionAsync({distanceInterval: 2}, (location) => {
                    setMyLatitude(location.coords.latitude);
                    setMyLongitude(location.coords.longitude);
                })
            }
        })()
    }, [])

    useEffect(() => {
        props.handleSaveList(listPOI)
    }, [listPOI])


    const handleAddingPOI = (e) => {
        const {coordinate} = e.nativeEvent;
        if (addingPOI) {
            setListPOI([...listPOI, {latitude: coordinate.latitude, longitude: coordinate.longitude, title: null, desc: null}])
            setAddingPOI(false)
        }
    }

    const handleAddingInfo = (e, idx) => {
        if (!listPOI[idx].title && !listPOI[idx].desc) {
            setOverlay({show: true, index: idx})
        }
    }

    const handleInfoConfirmation = () => {
        const copyPOI = [...listPOI];
        copyPOI[overlay.index].title = overlayTitle
        copyPOI[overlay.index].desc = overlayDesc
        setListPOI(copyPOI)
        setOverlay({show: false, index: null})
        setOverlayDesc(null)
        setOverlayTitle(null)
    }

    const generatePOI = listPOI.map((e,idx) => (
        <Marker key={idx} coordinate={{latitude: e.latitude, longitude: e.longitude}} pinColor="blue" onPress={el => handleAddingInfo(el, idx)} title={e.title} description={e.desc}/>
    ))

    return (
        <View style={styles.container}>
            <MapView onPress={e => handleAddingPOI(e)} style={styles.map} initialRegion={{latitude: 47.218371, longitude: -1.553621, latitudeDelta:5, longitudeDelta: 5}}>
                {myLatitude && myLongitude ? <Marker coordinate={{latitude: myLatitude, longitude: myLongitude}} title="Hello" description="I am here" pinColor="red"/> : null}
                {generatePOI}
            </MapView>
            <Overlay isVisible={overlay.show} onBackdropPress={() => setOverlay({show: false, index: null})} overlayStyle={styles.overlay}>
                <Input placeholder="Titre" onChangeText={e => setOverlayTitle(e)} value={overlayTitle}/>
                <Input placeholder="Desc" onChangeText={e => setOverlayDesc(e)} value={overlayDesc}/>
                <Button title="add info to POI" buttonStyle={styles.buttonOverlay} onPress={() => handleInfoConfirmation()}/>
            </Overlay>
            {addingPOI? null : <Button title="Add POI" buttonStyle={styles.buttonPOI} onPress={() => setAddingPOI(true)}/>}
        </View>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        handleSaveList: (list) => {
            dispatch({type: "saveList", list})
        }
    }
}

function mapStateToProps(state) {
    return {
        listFromStore: state.poiList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)