import { Button, Image } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Alert, ViewBase, Dimensions } from 'react-native'
import { auth } from '../../firebase';
import FeedsContainer from './feeds/FeedsContainer';
import HeaderContainer from './profile/HeaderContainer';
import { LocalData } from '../../LocalData/LocalData';
import ProgressionContainer from './profile/ProgressionContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BarChart } from 'react-native-chart-kit';

function ProfileScreen({ navigation }) {

  // Controling the feeds
  const childRef: any = useRef();
  const childRef2: any = useRef();
  const childRef3: any = useRef();

  //Usikker på om vi trenger denne
  // function handlePressTopTab() {
  //   childRef.current.refresh();
  // }

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

  const handleLogProgressPress = () => {
        
  }

  const handleBackPress = () => {
      
  }

  const handleForwardPress = () => {
      
  }

  const chartConfig = {
      backgroundGradientFrom: "#1a0b27",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#29123e",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(207, 179, 233, ${opacity})`,
      barPercentage: 0.7,
      decimalPlaces: 0,
  };

  const data = {
      labels: ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
      {
          data: [10, 5, 0, 7, 5, 6, 0]
      }
      ],
  };

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
        <HeaderContainer user={LocalData.currentUser} ref={childRef2}></HeaderContainer>
      </SafeAreaView>
      {/* This is the feed section */}
      <ScrollView stickyHeaderIndices={[1]} style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.progressionColumnContainer}>
            <View style={styles.progressHeaderContatiner}>
                    <Text adjustsFontSizeToFit={true} style={styles.progressHeaderText}> PROGRESS </Text>
            </View>
            <View style={styles.progressionRowContainer}>
                <View style={styles.chartTitleContainer}>
                    <Text adjustsFontSizeToFit={true} style={styles.chartTitle}> Times exercised week 8</Text>
                </View>
                <View style={styles.backContainer}>
                    <Ionicons name='caret-back-outline' color={'#cfb3e9'} size={30} onPress={handleBackPress}></Ionicons>
                </View>
                <View style={styles.forwardContainer}>
                    <Ionicons name='caret-forward-outline' color={'#cfb3e9'} size={30} onPress={handleBackPress}></Ionicons>
                </View>
            </View>
            <View>
                <BarChart
                    data={data}
                    width={windowWidth}
                    height={180}
                    yAxisLabel=''
                    yAxisSuffix=''
                    chartConfig={chartConfig}
                />
            </View>
            <View style={styles.logProgContainer}>
                <Button title = 'Log Progress' 
                    buttonStyle = {{justifyContent: 'center', backgroundColor: '#136A4A', alignSelf: 'stretch',
                        borderRadius: 8}}
                    titleStyle = {{fontSize: 18, fontWeight: 'normal', color: '#e6e6e6',}}
                    onPress={() => handleLogProgressPress()}
                />
            </View>
        </View>
        <View>
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
        </View>
        <FeedsContainer ref={childRef}></FeedsContainer>
      </ScrollView>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height; 
const windowWidth = Dimensions.get('window').width;

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
    fontSize: 37,
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
  progressionColumnContainer: {
    padding: '1%',
    height: 315,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
},
progressHeaderContatiner: {
    padding: '1%',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
},
progressHeaderText: {
    fontSize: 37,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#DC6247',
},
progressionRowContainer: {
    marginTop: '1%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
},
backContainer: {
    padding: '1%',
    height: 35,
},
forwardContainer: {
    padding: '1%',
    height: 35,
},
chartTitleContainer: {
    marginTop: 3,
    height: 35,
    justifyContent: "center",
    alignSelf: "center",
},
chartTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#cfb3e9',
},
logProgContainer: {
    padding: '1%',
    height: 50,
    alignSelf: "flex-end",
},
})
export default ProfileScreen;
