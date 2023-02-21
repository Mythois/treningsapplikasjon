import { Button, Image } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Alert, ViewBase } from 'react-native'
import { auth } from '../../firebase';
import FeedsContainer from './profile/ProgramsContainer';
import HeaderContainer from './profile/HeaderContainer';

function HomeScreen({ navigation }) {

  // Controling the feeds
  const childRef: any = useRef();

  function handlePressTopTab() {
    childRef.current.refresh();
  }

  //Log-out
    //TODO Need to make it log out if you press OK
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
    } else {
      mySetButtonColor('#121212');
      savedSetButtonColor('#303030');
    }
  }

  //SavedWoroutButtonPress
  const [savedButtonColor, savedSetButtonColor] = useState('#121212');
  const handleSavedPress = () => {
    if(savedButtonColor == '#121212') {
      savedSetButtonColor('#303030');
      mySetButtonColor('#121212');
    } else {
      savedSetButtonColor('#121212');
      mySetButtonColor('#303030');
    }
  }

  return (
    <View style={styles.container}>
      {/* This is the top section */}
      <SafeAreaView>
        {/*
        //? Kan vi fjerne dette som er markert ut?
        <ScrollView horizontal={true}>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>Myself</Text>
          </TouchableOpacity>
        </ScrollView>
  */}
        <View style={styles.topRowContainer}>
          <Image
            source={require("../../assets/images/WeTrainLogo.png")}
            containerStyle={styles.logoBox}
            style={{width: '50%', height: '70%'}}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator />} 
            onPress={() => navigation.navigate('Home')}>
          </Image>
          {/* Må legge profilbilde */}
          {/* Må legge inn textbox for user information*/}
          <Button color={'#121212'} title={'Sign out'} style={styles.signOutText} onPress={signOutAlert} />
        </View>
        <HeaderContainer ref={childRef}></HeaderContainer>
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
      {/* //!REMEMBER to remove the view-styling here when inserting the feed */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* //! <FeedsContainer></FeedsContainer> */}
        <Text style={{fontSize: 35, color: '#e6e6e6', fontStyle: 'italic'}}> 
          The feed will be here
        </Text>
      </View>
      {/* 
        //? Kan vi fjerne dette som er markert ut?
      <Text
          onPress={() => navigation.navigate('Home')}
          style={{ fontSize: 26, fontWeight: 'bold'}}
          >
              These are the newest feeds!!!
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Sign out"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={{
            backgroundColor: 'rgba(0,0,0,1)',
            borderRadius: 5,
            height: 55,
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
          containerStyle={{
            marginHorizontal: 50,
            height: 55,
            width: '90%',
          }}
          onPress={() => signOut(auth)}
        />
      </View> */}
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
    height: 50,
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
    height: 35,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  //? Kan vi fjerne dette som er markert ut?
  // buttonContainer: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '100%',
  // },
  // feedTab: {
  //   padding: 10,
  //   borderBottomWidth: 1,
  //   marginTop: 30,
  //   backgroundColor: 'rgb(30, 30, 30)',
  //   height: 49,
  // },
  // feedTabText: {
  //   fontSize: 24,
  //   color: 'rgb(230, 230, 230)',
  // },
  // headerText: {
  //   fontSize: 24,
  //   color: 'rgb(230, 230, 230)',
  // },
})
export default HomeScreen;
