import React from 'react';
import { useAuth } from "../hooks/useAuth";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    const { user } = useAuth();
    
    return user ? <MainStack /> : <AuthStack />;
}
        