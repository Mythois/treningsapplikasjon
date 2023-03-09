import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LocalData } from '../../../LocalData/LocalData';
import { WorkoutUser } from '../../../LocalData/Users/WorkoutUser';
import { Button, Image, Avatar } from '@rneui/themed';
import { signOut } from 'firebase/auth';




function smallHeaderContent({user, ref, navigation} : {user : WorkoutUser, ref : any, navigation: any }) {


    // Refreshes all items in the item list --> trenger ikke å kunne refreshe headeren

    return (
        <View style={styles.topRowContainer}>
          {/*Logo */}
          <Image
            source={require("../../../assets/images/WeTrainLogo.png")}
            containerStyle={styles.logoBox}
            style={{width: '50%', height: '70%', flex: 1}}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator />} 
            onPress={() => navigation.navigate('Home')}>
          </Image>

          <TouchableOpacity style={styles.userBox} onPress={() => { navigation.navigate('Profile') }}>
            <View style={styles.userName}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}> @{user.username.toString()}</Text>
            </View>
            <Avatar
            rounded
            icon={{
            name: 'person-outline',
            type: 'material',
            size: 26,
            }}
            containerStyle={{ backgroundColor: '#c2c2c2' }}
            />
            
        </TouchableOpacity> 
        </View>);
    
};


export default forwardRef(smallHeaderContent);


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgb(30, 30, 30)',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  feedTab: {
    padding: 10,
    borderBottomWidth: 1,
    marginTop: 30,
    backgroundColor: 'rgb(30, 30, 30)',
    height: 49,
  },
  feedTabText: {
    fontSize: 24,
    color: 'rgb(230, 230, 230)',
  },
  topRowContainer: {
    padding: '1%',
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#121212"
  },
  logoBox: {
    //padding: '1%',
    marginLeft: 5,
    marginTop: 9,
    width: '70%',
  },
  userBox: {
    flexDirection: 'row', 
    //justifyContent:"space-around", 
    //alignContent:"flex-start",
    //alignItems: "left",
    padding: '1%', 
    paddingVertical: 7, 
    flex: 1, 
    width:"100%", 
    alignItems:"center"
  },
  userName: {
    flex: 1, 
    width:"75%",
    right: 20
  }
})


