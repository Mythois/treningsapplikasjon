import { RouteProp } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { View } from 'react-native';
import * as React from 'react';
import { RootStackParamList } from '../../../types';

type FriendProfileScreenRouteProp = RouteProp<RootStackParamList, 'FriendProfileScreen'>;

export default function FriendProfileScreen({ route }: { route: FriendProfileScreenRouteProp }) {
    const { user } = route.params;

    return (
        <View style={{flex:1}}>
            <Text>{user.name}</Text>
        </View>
    );
}
