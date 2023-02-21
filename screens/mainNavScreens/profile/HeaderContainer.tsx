import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Image } from '@rneui/themed';
import {View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator} from 'react-native';
import FeedsListItem from './ProgramsList';
import { BackgroundImage } from '@rneui/base';



function HeaderContainer(props,ref) {
    
    // Contains the current items
    const [itemsState, setItems] = useState([]);
    useEffect(() => {
        //refresh();
    }, []);

    // Managing what to load
    // const [loadFilters, setFilters] = useState(defaultFilters);

    // Refreshes all items in the item list --> trenger ikke å kunne refreshe headeren


    return (
        <View style={styles.container}>
            {/* Logo og log out*/}
            <View style={styles.rowContainer1}>
            <Image
                source={require("../../../assets/images/WeTrainLogo.png")}
                containerStyle={styles.imageBox}
                style={{width: '50%', height: '70%'}}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />} ></Image>
            
            
            {/* Må legge profilbilde */}
            {/* Må legge inn textbox for user information*/}
            <Text style={styles.logoutText}> Log out </Text>
            </View>

            <View style={styles.rowContainer2}>
                <View style={styles.profileImageBox}>
                    <Text>OMG</Text>
                    {/* 
                    <Image
                    source={require("../../../assets/images/man_running.jpg")}
                    containerStyle={styles.profilePicture}
                    style={{width: '45%', height: '45%'}}
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator />} ></Image>
                    */}
                </View>
            
            <View style={styles.columnContainer2}>
                <View style={styles.textBox}>
                    <Text> @user </Text>
                </View>
                <View style={styles.editBox}>
                    <Text style={styles.editText}> EDIT </Text>
                </View>
            </View>
            </View>
        </View>
    )
};

export default forwardRef(HeaderContainer);

//styles from FeedsContainers
const windowHeight = Dimensions.get('window').height; // henter høyden på vinduet 
const windowWidth = Dimensions.get('window').width;
const headerHight = 80; // usikker på om dette er helt riktig men tror det
const menuhight = 20;

//Her kan vi adde stylinger --> må legge til en header styling
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',  //bakgrunn fargen
        height: 200,  // window hight minus top bar minus bunn meny
        flexDirection: "column",
        alignItems: "stretch",
    },
    list: {
        position: 'relative',
    },
    logoutText: {
        fontSize: 20,
        color: '#e6e6e6',
    },
    imageBox: {
        width: '70%',
    },
    rowContainer1: {
        height: '25%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#a40000"
    },
    rowContainer2: {
        height: "100%",
        flexDirection: "row",
        // flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#ffffff",
    },
    columnContainer2: {
        flexDirection: "column",
        flex: 2,
    },
    profilePicture: {
        //borderRadius: '50%/2',
        marginTop: 5,
        aspectRatio: 1,
        width: '80%',
        fontSize: 24,
    },
    textBox: {
        fontSize: 30,
        // color: '#e6e6e6',
        backgroundColor: '#ff0000',
        flex: 1,
        alignItems: "center",
    },
    editBox: {
        //justifyContent: "flex-end",
        backgroundColor: "#0000ff",
        flex: 1,
        //alignItems: "flex-end",
        textAlignVertical:'top',
    },
    profileImageBox: {
        flex: 1,
        //width: '40%',
        //height: '100%',
    },
    editText: {
        color: '#ffffff',
        backgroundColor: '#121212',
    }
});