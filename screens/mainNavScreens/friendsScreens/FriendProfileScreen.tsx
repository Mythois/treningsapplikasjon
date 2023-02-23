import { RouteProp } from '@react-navigation/native';
import { Icon, Text, Image, Button, Avatar } from '@rneui/themed';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet, SafeAreaView, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { RootStackParamList } from '../../../types';
import { LocalData } from '../../../LocalData/LocalData';
import FeedsContainer from '../feeds/FeedsContainer';
import HeaderContainer from '../profile/HeaderContainer';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';


type FriendProfileScreenRouteProp = RouteProp<RootStackParamList, 'FriendProfileScreen'>;

export default function FriendProfileScreen({ route, navigation }: { route: FriendProfileScreenRouteProp, navigation: any }) {
    const { user } = route.params;
    const [follows, setFollows] = React.useState<boolean>(LocalData.currentUser.friends.includes(user.id));
    const childRef: any = useRef();

      //Log-out
      const signOutAlert = () =>
      Alert.alert('Sign out', 'Do you wish to sign out?', [
          {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
          },
              {text: 'OK', onPress: () => signOut(auth)},
      ]);

    return (
        <View style={styles.container}>
      {/* This is the header area */}
      <SafeAreaView>
        <View style={styles.topRowContainer}>
            {/*<Icon type='font-awesome' name="chevron-left" size={20} color="white"/>*/}
          {/*Logo */}
          <Image
            source={require("../../assets/images/WeTrainLogo.png")}
            containerStyle={styles.logoBox}
            style={{width: '50%', height: '70%'}}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator />} 
            onPress={() => navigation.navigate('Home')}>
          </Image>
          {/* Log out knapp */}
          <Button color={'#121212'} title={'Sign out'} style={styles.signOutText} onPress={signOutAlert} />
        </View>
        {/* Header: profilbilde, navn og brukernavn*/}
        <HeaderContainer user={user} ref={childRef}></HeaderContainer>
        <View style={styles.workoutHeaderContatiner}>
          <Text adjustsFontSizeToFit={true} style={styles.workoutHeaderText}> WORKOUTS </Text>
        </View>
        </SafeAreaView>
      {/* This is the feed section */}
      <View style={{flex: 1, flexDirection: 'column'}}>
        <FeedsContainer ref={childRef}></FeedsContainer>
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
    topRowContainer: {
      padding: '1%',
      height: 55,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#121212"
    },
    logoBox: {
      marginLeft: 5,
      width: '70%',
    },
    signOutText: {
      fontSize: 20,
      fontWeight: 'normal',
      color: '#e6e6e6',
      marginRight: '1%',
    },
    workoutHeaderContatiner: {
      padding: '1%',
      height: 50,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#121212"
    },
    workoutHeaderText: {
      fontSize: 35,
      fontWeight: '900',
      letterSpacing: 2,
      color: '#DC6247',
    },
    chooseWorkoutContainer: {
      padding: '1%',
      height: 50,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });