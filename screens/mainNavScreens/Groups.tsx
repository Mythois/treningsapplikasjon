import { Icon, Text, Image, Button, Avatar } from '@rneui/themed';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet, SafeAreaView, Alert } from 'react-native';
import React, { useRef, useState } from 'react';



export default function Groups({navigation}) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
            <Button
                title = "New Group"
                onPress={() => navigation.navigate('NewGroup')}
            />
            <Text 
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold'}}
                >
                    This is the groups page
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      backgroundColor: '#121212',
    },
});
