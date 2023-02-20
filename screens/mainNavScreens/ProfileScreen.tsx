import * as React from 'react';
import { View, Text} from 'react-native';
import { LocalData } from '../../LocalData/LocalData';

export default function ProfileScreen({navigation}) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text 
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 22, fontWeight: 'bold'}}
                >
                    This is the profile screen, Press this to go back to home screen.
                    Currently signed in: {LocalData.currentUser.username}
            </Text>

        </View>
    );
}