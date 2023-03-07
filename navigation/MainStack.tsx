import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/mainNavScreens/HomeScreen';
import ProfileScreen from '../screens/mainNavScreens/ProfileScreen';
import Groups from '../screens/mainNavScreens/Groups';
import Program from '../screens/mainNavScreens/Program';
import SearchStack from '../screens/mainNavScreens/friendsScreens/SearchStack';
import NewGroup from '../screens/mainNavScreens/NewGroup';  


// Screen Names
const homeName:any = "Home";
const profileName:any = "Profile";
const search:any = "Search";
const groups:any = "Groups";
const program:any = "Program";
const newGroup:any = "NewGroup";

const Tab: any = createBottomTabNavigator();
const Stack: any = createStackNavigator();

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
                <Stack.Screen name={groups} 
                component={GroupsStack}
                options={{ headerShown: false}}
                />
                <Tab.Screen name={profileName} 
                component={ProfileScreen}
                options={{ headerShown: false }}
                />

            </Tab.Navigator>
            
        </NavigationContainer>
    );
}

function GroupsStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={groups}
          component={Groups}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={newGroup}
          component={NewGroup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
}