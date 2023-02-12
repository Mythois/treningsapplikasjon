import * as React from 'react';
import { View, Text} from 'react-native';

export default function ProfileScreen(navigation) {
    return(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text onPress={() => navigation.navigate('Home')}>This is the profile screen</Text>
        </View>
    );
}