import { Icon, Text, Image, Button, Avatar } from '@rneui/themed';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet, SafeAreaView, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import SmallHeaderContent from './profile/SmallHeaderContent';
import { LocalData } from '../../LocalData/LocalData';
// import GroupsContainer from './groups/GroupsContainer';



export default function showPrograms({navigation, program}) {

    const childRef: any = React.useRef();

    return(
        <View style={styles.container}>
            <SafeAreaView>
                <View>
                    <View >
                        <SmallHeaderContent user={LocalData.currentUser} ref={childRef} navigation={navigation}></SmallHeaderContent>
                    </View>
                    <View style={{flexDirection: "row", alignContent: 'space-between', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.mainText}>Groups</Text>
                        </View>
                        <View style={{margin: '2%'}}>
                            <Button buttonStyle={styles.plussButton} 
                                title="+"
                                onPress={() => navigation.navigate('NewGroup')}></Button>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
            {/*<GroupsContainer ref={childRef}></GroupsContainer>*/}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      backgroundColor: '#121212',
      //flexDirection: 'column',
    },
    mainText: {
        fontSize: 35,
        fontWeight: '900',
        letterSpacing: 2,
        color: '#DC6247',
        marginLeft: '10%',
        margin: '5%',
        //textAlign:"center",
    },
    plussButton: {
        borderRadius:5, 
        //marginTop:"10%",
        backgroundColor: "#136A4A",
        margin: '2%',
    },
});
