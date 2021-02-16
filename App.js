import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import ChatScreen from './ChatScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const generalStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="MapChat" component={MapChatNav}/>
      </Stack.Navigator>
    </NavigationContainer>
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
      <Tab.Screen name="Chat" component={ChatScreen} options={{
        tabBarIcon: ({color,size}) => (
          <Ionicons name="chatbubbles-sharp" size={size} color={color} />
        )
      }}/>
    </Tab.Navigator>
  )
}