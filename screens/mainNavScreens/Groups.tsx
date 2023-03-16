import { Icon, Text, Image, Button, Avatar } from '@rneui/themed';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet, SafeAreaView, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import SmallHeaderContent from './profile/SmallHeaderContent';
import { LocalData } from '../../LocalData/LocalData';



export default function Groups({navigation}) {

    const childRef: any = React.useRef();

    return(
        <View style={styles.container}>
            <SafeAreaView>
            <SmallHeaderContent user={LocalData.currentUser} ref={childRef} navigation={navigation}></SmallHeaderContent>
            </SafeAreaView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
            
            <Button
                title = "New Group"
                onPress={() => navigation.navigate('NewGroup')}
            />
            <Text 
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold', color: 'white'}}
                >
                    This is the groups page
            </Text>
        </View>
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
