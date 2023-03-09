import { Button, Image } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Alert, ViewBase } from 'react-native'
import { auth } from '../../firebase';
import FeedsContainer from './feeds/FeedsContainer';
import HeaderContainer from './profile/HeaderContainer';
import { LocalData } from '../../LocalData/LocalData';

function ProfileScreen({ navigation }) {

  // Controling the feeds
  const childRef: any = useRef();

  //Usikker på om vi trenger denne
  function handlePressTopTab() {
    childRef.current.refresh();
  }

  //Load My Programs to feed
  function showMyPrograms() {

  }

  //Load Saved Programs to feed
  function showSaved() {
    
  }

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
  
  //TODO When making the feed we need to make sure that it responds to the current button choice
  //MyWorkoutsButtonPress
  const [myButtonColor, mySetButtonColor] = useState('#303030');
  const handleMinePress = () => {
    if(myButtonColor == '#121212') {
      mySetButtonColor('#303030');
      savedSetButtonColor('#121212');
      showSaved();
    }
  }

  //SavedWoroutButtonPress
  const [savedButtonColor, savedSetButtonColor] = useState('#121212');
  const handleSavedPress = () => {
    if(savedButtonColor == '#121212') {
      savedSetButtonColor('#303030');
      mySetButtonColor('#121212');
      showMyPrograms();
    }
  }

  return (
    <View style={styles.container}>
      {/* This is the header area */}
      <SafeAreaView>
        <View style={styles.topRowContainer}>
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
        <HeaderContainer user={LocalData.currentUser} ref={childRef}></HeaderContainer>
        <View style={styles.workoutHeaderContatiner}>
          <Text adjustsFontSizeToFit={true} style={styles.workoutHeaderText}> WORKOUTS </Text>
        </View>
        <View style={styles.chooseWorkoutContainer}>
          <View style={{flex: 1}}>
            <Button title = 'Mine' 
                buttonStyle = {{justifyContent: 'center', backgroundColor: myButtonColor, alignSelf: 'stretch'}}
                titleStyle = {{fontSize: 18, fontWeight: 'normal', color: '#e6e6e6',}}
                onPress={() => handleMinePress()}
            />
          </View>
          <View style={{flex: 1}}>
            <Button title = 'Saved' 
                buttonStyle = {{justifyContent: 'center', backgroundColor: savedButtonColor, alignSelf: 'stretch'}}
                titleStyle = {{fontSize: 18, fontWeight: 'normal', color: '#e6e6e6',}}
                onPress={() => handleSavedPress()}
            />
          </View>
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
})
export default ProfileScreen;
