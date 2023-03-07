import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendProfileScreen from './FriendProfileScreen';
import SearchScreen from './SearchScreen';

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="SearchScreen" component={SearchScreen}
        options={{ headerShown: false }}/>
        <Stack.Screen name="FriendProfileScreen" component={FriendProfileScreen}
        options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}