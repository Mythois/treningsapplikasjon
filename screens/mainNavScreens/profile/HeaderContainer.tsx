import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Image } from '@rneui/themed';
import {View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, Alert} from 'react-native';
import FeedsListItem from './ProgramsList';
import { BackgroundImage } from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';

//General todo-list realted to the profile-page, not just the HeaderContainer-file:
//TODO We have to get and insert stored user information from firebase
//TODO We have to make an edit-mode where the user can change user info and delete/unsave workouts

function HeaderContainer(props,ref) {
    
    // Contains the current items
    const [itemsState, setItems] = useState([]);
    useEffect(() => {
        //refresh();
    }, []);

    //Log-out
    //TODO Need to make it log out if you press OK
    const signOutAlert = () =>
    Alert.alert('Sign out', 'Do you wish to sign out?', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

    //Edit-icon states
    const [iconState, setIcon] = useState('create-outline');
    const handleEditPress = () => {
        // Toggle between normal-mode and edit-mode
        //TODO Have to figure out how to change back to 'default' when you change screens
        if(iconState === 'create') {
            //TODO Have to figure out how to save changes
            setIcon('create-outline')
        } else {
            setIcon('create')
        }
    }


    // Managing what to load
    // const [loadFilters, setFilters] = useState(defaultFilters);

    // Refreshes all items in the item list --> trenger ikke å kunne refreshe headeren


    return (
        <View style={styles.mainContainer}>
            {/* Logo og sign out*/}
            <View style={styles.rowContainer1}>
                <Image
                    source={require("../../../assets/images/WeTrainLogo.png")}
                    containerStyle={styles.imageBox}
                    style={{width: '50%', height: '70%'}}
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator />} 
                    /*//TODO 
                        Have to go back to Home-screen if logo is pressed,
                        should we use navigation.natvigate('Home'), 
                        and if so, how?
                    */
                    onPress={() => ''}>
                </Image>
                {/* Må legge profilbilde */}
                {/* Må legge inn textbox for user information*/}
                <Button color={'#121212'} title={'Sign out'} style={styles.signOutText} onPress={signOutAlert} />
            </View>
            <View style={styles.rowContainer2}>
                <View style={styles.profileImageBox}>
                    <Image
                    source={require("../../../assets/images/userPic.jpg")}
                    containerStyle={styles.profilePicture}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator />} >
                    </Image>
                </View>
                <View style={styles.columnContainer}>
                    <View style={styles.realNameBox}>
                        <Text adjustsFontSizeToFit={true} style={styles.realNameText}> Username </Text>
                    </View>
                    <View style={styles.userNameBox}>
                        <Text adjustsFontSizeToFit={true} style={styles.userNameText}> @user </Text>
                    </View>
                    <View style={styles.editBox}>
                        <Ionicons name={iconState} style={styles.editIcon} size={30} onPress={handleEditPress}/>
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
    mainContainer: {
        backgroundColor: '#121212',  //bakgrunn fargen
        height: 200,  // window hight minus top bar minus bunn meny
        flexDirection: "column",
        alignItems: "stretch",
    },
    rowContainer1: {
        height: '25%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#121212"
    },
    imageBox: {
        width: '70%',
    },
    signOutText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#e6e6e6',
        marginRight: '1%',
    },
    list: { //? Blir denne brukt?
        position: 'relative',
    },
    rowContainer2: {
        height: "75%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#121212",
    },
    profileImageBox: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
    },
    //?This part uses specific heights, and not percentage which may cause a problem
    profilePicture: {
        height: 143,
        width: 143,
        borderRadius: 143/2,
        borderWidth: 2,
        borderColor: '#e6e6e6',
    },
    columnContainer: {
        flexDirection: "column",
        width: '55%',
    },
    realNameBox: {
        backgroundColor: '#121212',
        height: '50%',
        alignItems: "flex-start",
        justifyContent: 'flex-end',
    },
    realNameText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#e6e6e6',
    },
    userNameBox: {
        backgroundColor: '#121212',
        height: '15%',
        alignItems: "flex-start",
        justifyContent: 'flex-start',
    },
    userNameText: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#e6e6e6',
    },
    editBox: {
        backgroundColor: "#121212",
        height: '35%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-end',
    },
    editIcon: {
        color: "#e6e6e6",
        alignItems: "center",
        justifyContent: 'flex-end',
        padding: '5%',
    },
});