import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Image } from '@rneui/themed';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LocalData } from '../../../LocalData/LocalData';
import { WorkoutUser } from '../../../LocalData/Users/WorkoutUser';

//General todo-list realted to the profile-page, not just the HeaderContainer-file:
//TODO We have to get and insert stored user information from firebase
//TODO We have to make an edit-mode where the user can change user info and delete/unsave workouts
//TODO We have to make a feed

function HeaderContainer({user, ref} : {user : WorkoutUser, ref : any}) {
    
    // Contains the current items
    const [itemsState, setItems] = useState([]);
    useEffect(() => {
        //refresh();
    }, []);

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
        <View style={styles.rowContainer}>
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
                    <Text adjustsFontSizeToFit={true} style={styles.realNameText}> {user.name.toString()} </Text>
                </View>
                <View style={styles.userNameBox}>
                    <Text adjustsFontSizeToFit={true} style={styles.userNameText}> @{user.username.toString()} </Text>
                </View>
                <View style={styles.editBox}>
                    <Ionicons name={iconState} style={styles.editIcon} size={30} onPress={handleEditPress}/>
                </View>
            </View>
        </View>
    )
};

export default forwardRef(HeaderContainer);

//styles from FeedsContainers
const windowHeight = Dimensions.get('window').height; // henter høyden på vinduet 
const windowWidth = Dimensions.get('window').width;
const headerHight = 60; // usikker på om dette er helt riktig men tror det
const menuhight = 20;

//Her kan vi adde stylinger --> må legge til en header styling
const styles = StyleSheet.create({
    list: { //? Blir denne brukt? Skal vi fjerne den?
        position: 'relative',
    },
    rowContainer: {
        backgroundColor: '#121212',
        height: 160,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: '1%',
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