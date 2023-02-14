import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/authScreens/LoginScreen';
import AuthLandingScreen from '../screens/authScreens/AuthLandingScreen';
import RegisterScreen from '../screens/authScreens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Auth" 
            component={AuthLandingScreen}
            options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen}
            options={{ headerShown: false }}
            />
            <Stack.Screen name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
    );
}
        