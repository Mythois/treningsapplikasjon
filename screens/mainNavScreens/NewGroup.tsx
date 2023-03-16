import { Icon, Text, Image, Button, Avatar } from '@rneui/themed';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet, SafeAreaView, Alert, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid'

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
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212'}}>
            <View style={{marginLeft:"-65%", marginTop:"-50%"}}>
                <Button
                    onPress={() => navigation.navigate('Groups')}
                    buttonStyle={{ width:70
                        , backgroundColor:"#000000", borderColor:"#FFFFFF", borderWidth:1}}
                    titleStyle={{fontSize:15}}

                    title="Back"
                />
            </View>
            <View style={{flexDirection:'column',marginTop:"10%"}}>
                    <View>
                        <Text
                        style = {{fontWeight:"bold", fontSize:40, color:"#DC6247", textAlign:"center", paddingBottom:10}}>
                            New Group
                        </Text>
                    </View>
                    <View style={{borderWidth:1, borderColor:"#FFFFFF", borderRadius:5, padding:5, marginTop:"7%", width:250, height:40}}>
                        <TextInput
                            style={{fontSize:23}}
                            placeholderTextColor={"#FFFFFF"}
                            placeholder="Name"
                            onChangeText={handleNameChange}
                        />
                    </View>
                    <View style={{borderWidth:1, borderColor:"#FFFFFF", borderRadius:5, padding:5, marginTop:"7%", width:250, height:150}}>
                        <TextInput
                        style={{fontSize:23}}
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
    );
}