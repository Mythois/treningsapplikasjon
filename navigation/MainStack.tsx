import * as React from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/mainNavScreens/HomeScreen';
import ProfileScreen from '../screens/mainNavScreens/ProfileScreen';

// Screen Names
const homeName:any = "Home";
const profileName:any = "Profile";

const Tab:any = createBottomTabNavigator();

export default function MainStack(){
    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName={homeName} 
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === profileName) {
                            iconName = focused ? 'person' : 'person-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    }
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: { fontSize: 10 },
                    tabStyle: { backgroundColor: 'rgba(10, 10, 10, 1)' }
                }}
            >

                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={profileName} component={ProfileScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}