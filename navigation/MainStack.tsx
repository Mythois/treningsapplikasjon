import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/authScreens/LoginScreen';
import HomeScreen from '../screens/mainNavScreens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    
    return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
}
        