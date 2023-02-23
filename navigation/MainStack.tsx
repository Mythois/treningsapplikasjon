import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/mainNavScreens/HomeScreen';
import ProfileScreen from '../screens/mainNavScreens/ProfileScreen';
import Groups from '../screens/mainNavScreens/Groups';
import Program from '../screens/mainNavScreens/Program';
import SearchStack from '../screens/mainNavScreens/friendsScreens/SearchStack';

// Screen Names
const homeName:any = "Home";
const profileName:any = "Profile";
const search:any = "Search"
const groups:any = "Groups"
const program:any = "Program"

const Tab: any = createBottomTabNavigator();

export default function MainStack() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    "tabBarActiveTintColor": "tomato",
                    "tabBarInactiveTintColor": "grey",
                    "tabBarLabelStyle": {
                        "fontSize": 10
                    },
                    "tabBarItemStyle": {
                        "backgroundColor": "rgba(10, 10, 10, 1)"
                    },
                    "tabBarStyle": [
                        {
                            "display": "flex"
                        },
                        null
                    ],

                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        switch (rn) {
                            case homeName:
                                iconName = focused ? 'home' : 'home-outline'
                                break
                            case profileName:
                                iconName = focused ? 'person' : 'person-outline'
                                break
                            case search:
                                iconName = 'search'
                                break
                            case groups:
                                iconName = focused ? 'people' : 'people-outline'
                                break
                            case program:
                                iconName = focused ? 'barbell' : 'barbell-outline'
                                break
                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}
            >

                <Tab.Screen name={homeName}
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Tab.Screen name={search}
                    component={SearchStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen name={program} 
                component={Program}
                options={{ headerShown: false }}
                />
                <Tab.Screen name={groups} 
                component={Groups}
                />
                <Tab.Screen name={profileName} 
                component={ProfileScreen}
                options={{ headerShown: false }}
                />

            </Tab.Navigator>
            
        </NavigationContainer>
    );
}