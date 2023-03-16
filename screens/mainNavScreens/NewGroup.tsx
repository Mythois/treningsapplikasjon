import { Icon, Text, Image, Button, Avatar } from '@rneui/themed';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet, SafeAreaView, Alert, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid'
import SmallHeaderContent from './profile/SmallHeaderContent';
import { LocalData } from '../../LocalData/LocalData';

interface group {
    id:number;
    name:string;
    description:string;
}


export default function NewGroup({navigation}) {

    const [currentName, newName] = React.useState('');
    const [currentDesc, newDesc] = React.useState('');

    const handleNameChange = (text) => {
        newName(text);
    }

    const handleDescChange = (text) => {
        newDesc(text);
    }

    const handleSave = () => {
        
    }

    const childRef: any = React.useRef();

    return(
        <View style={styles.container}>
            <SafeAreaView>
            <SmallHeaderContent user={LocalData.currentUser} ref={childRef} navigation={navigation}></SmallHeaderContent>
            </SafeAreaView>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#121212'}}>
            
            <View style={{marginLeft:"-65%", marginTop:"5%"}}>
                <Button
                    onPress={() => navigation.navigate('Groups')}
                    buttonStyle={{ width:70
                        , backgroundColor:"#000000", borderColor:"#FFFFFF", borderWidth:1}}
                    titleStyle={{fontSize:15}}

                    title="Back"
                />
            </View>
            <View style={{flexDirection:'column',marginTop:"2%"}}>
                    
                    <View style={{padding:5, marginTop:"5%", width:250, height:40}}>
                        <TextInput
                            style={styles.mainText}
                            placeholderTextColor={"#DC6247"}
                            placeholder="NEW GROUP"
                            onChangeText={handleNameChange}
                        />
                    </View>
                    <View style={{borderWidth:1, borderColor:"#FFFFFF", borderRadius:5, padding:5, marginTop:"7%", width:250, height:150}}>
                        <TextInput
                        style={{fontSize:23, color: "#FFFFFF"}}
                        placeholderTextColor={"#FFFFFF"}
                        placeholder="Description"
                        onChangeText={handleDescChange}
                        />
                    </View>
                    <View>
                        <Button
                        buttonStyle={{borderRadius:5, marginTop:"10%"}}
                        title="Create"
                        onPress={() =>handleSave()}
                        />
                    </View>
            </View>
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
    mainText: {
        fontSize: 35,
        fontWeight: '900',
        letterSpacing: 2,
        color: '#DC6247',
        textAlign:"center",
    },
});