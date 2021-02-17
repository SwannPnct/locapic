import React from 'react'
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native'
import {ListItem} from 'react-native-elements'
import {connect} from 'react-redux'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', 
        backgroundColor: "#F1F2F5",
        paddingTop: 50
    },
    ListItem: {
        width: Dimensions.get("window").width,
    }
})

function PoiScreen(props) {
    return (
        <View style={styles.container}>
        
        <ScrollView style={{flex: 1}}>
            {
        props.poiList.map((l, i) => (
        <ListItem key={i} bottomDivider style={styles.ListItem}>
        <ListItem.Content>
          <ListItem.Title>{l.title}</ListItem.Title>
          <ListItem.Subtitle>{l.desc}</ListItem.Subtitle>
          <ListItem.Subtitle>{"lat: " + l.latitude + " long: " + l.longitude}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
  }
        </ScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        poiList: state.poiList
    }
}

export default connect(mapStateToProps, null)(PoiScreen)