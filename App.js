import React from 'react';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import ChatScreen from './ChatScreen';
import PoiScreen from './PoiScreen';

import pseudo from './reducers/pseudo.reducer'
import poiList from './reducers/poi.reducer'

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const store = createStore(combineReducers({pseudo, poiList}))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="MapChat" component={MapChatNav}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}

function MapChatNav() {
  return (
    <Tab.Navigator initialRouteName="Map" 
    tabBarOptions={{activeTintColor:"#FF4545", inactiveTintColor: "white", style:{backgroundColor: "#011268"}}}>
      <Tab.Screen name="Map" component={MapScreen} options={{
        tabBarIcon: ({color,size}) => (
          <FontAwesome name="location-arrow" size={size} color={color} />
        )
      }}/>
      <Tab.Screen name="All POI" component={PoiScreen} options={{
        tabBarIcon: ({color,size}) => (
          <FontAwesome name="list-ul" size={size} color={color} />
        )
      }}/>
      <Tab.Screen name="Chat" component={ChatScreen} options={{
        tabBarIcon: ({color,size}) => (
          <Ionicons name="chatbubbles-sharp" size={size} color={color} />
        )
      }}/>
    </Tab.Navigator>
  )
}