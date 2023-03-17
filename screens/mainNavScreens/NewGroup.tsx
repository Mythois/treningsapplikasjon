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
    const handleBack = () => {
        navigation.navigate('Groups')
    }

    const childRef: any = React.useRef();

    return(
        <View style={styles.container}>
            <SafeAreaView>
            <SmallHeaderContent user={LocalData.currentUser} ref={childRef} navigation={navigation}></SmallHeaderContent>
            
            </SafeAreaView>
            
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#121212'}}>
            
            <View style={{marginLeft:"-80%", marginTop:"1%", flexDirection: "row"}}>
                
                <Icon type='font-awesome' name="chevron-left" size={20} color={'#e6e6e6'} onPress={handleBack}/>
                <Text style={styles.text} onPress={handleBack}>Back</Text>
          </View>
            <View style={{flexDirection:'column',marginTop:"2%"}}>
                    
                    <View style={{padding:5, marginTop:"5%", width: '85%', height:40}}>
                        <TextInput
                            style={styles.mainText}
                            placeholderTextColor={"#DC6247"}
                            placeholder="NEW GROUP"
                            onChangeText={handleNameChange}
                        />
                    </View>
                    <View style={{borderWidth:1, borderColor:"#303030", borderRadius:5, padding:5, marginTop:"7%", width:350, height:300 }}>
                        <TextInput
                        style={styles.boxText}
                        placeholderTextColor={"#303030"}
                        placeholder="Description"
                        onChangeText={handleDescChange}
                        />
                    </View>
                    <View>
                        <Button
                        buttonStyle={{borderRadius:5, marginTop:"10%",backgroundColor: "#136A4A" }}
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
        //textAlign:"center",
    },
    text: {
        color: "#FFFFFF",
        marginLeft: '1%',
        fontSize: 15,
    }, 
    boxText: {
        fontSize: 22,
        fontWeight: '400',
        letterSpacing: 1,
        color: '#FFFFFF',
    },
});