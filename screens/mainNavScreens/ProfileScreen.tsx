import { Button, Image } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Alert, ViewBase, Dimensions } from 'react-native'
import { auth } from '../../firebase';
import FeedsContainer from './feeds/FeedsContainer';
import HeaderContainer from './profile/HeaderContainer';
import { LocalData } from '../../LocalData/LocalData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BarChart } from 'react-native-chart-kit';

function ProfileScreen({ navigation }) {

  // Controling the feeds
  const childRef: any = useRef();

  //Usikker på om vi trenger denne
  // function handlePressTopTab() {
  //   childRef.current.refresh();
  // }

  //Load My Programs to feed
  function showMyPrograms() {
    //TODO Make the list show your own programs
  }

  //Load Saved Programs to feed
  function showSavedPrograms() {
    //TODO Make the list show saved programs
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
  
  //MyWorkoutsButtonPress
  const [myButtonColor, mySetButtonColor] = useState('#303030');
  const handleMinePress = () => {
    if(myButtonColor == '#121212') {
      mySetButtonColor('#303030');
      savedSetButtonColor('#121212');
      showSavedPrograms();
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

  //Move to LogProgressScreen
  const handleLogProgPress = () => {
        navigation.navigate('Progress');
  }

  //Move to last week
  const handleBackPress = () => {
      //TODO Update chart-data to correct week
  }

  //Move to next week
  const handleForwardPress = () => {
      //TODO Update chart-data to correct week, and make sure that the user can't go forward to a "non-existent" week
  }

  //Chart-styling
  const chartStyle = {
      backgroundGradientFrom: "#1a0b27",
      backgroundGradientFromOpacity: 0.3,
      backgroundGradientTo: "#29123e",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(207, 179, 233, ${opacity})`,
      barPercentage: 0.7,
      decimalPlaces: 0,
  };

  //The data that goes intro the graph
  //TODO Change the data to acutal data
  const chartData = {
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
          <Button 
            color={'#121212'} 
            title={'Sign out'} 
            style={styles.signOutText} 
            onPress={signOutAlert} 
          />
        </View>
        {/* Header: navn profilbilde og brukernavn*/}
        <HeaderContainer user={LocalData.currentUser} ref={childRef}></HeaderContainer>
      </SafeAreaView>
      {/* This is the feed section */}
      <ScrollView stickyHeaderIndices={[1]} style={{flex: 1, flexDirection: 'column'}}>
        {/* The progress part of the profile-screen*/}
        <View style={styles.progColumnContainer}>
            <View style={styles.progHeaderContatiner}>
                    {/* Progress title*/}
                    <Text adjustsFontSizeToFit={true} style={styles.progHeaderText}> 
                      PROGRESS 
                    </Text>
            </View>
            <View style={styles.progRowContainer}>
                {/* Graph header*/}
                <View style={styles.chartTitleContainer}>
                    <Text adjustsFontSizeToFit={true} style={styles.chartTitle}> 
                      {/* //TODO the week number must update when moving between different weeks*/}
                      Times exercised week 8
                    </Text>
                </View>
                <View style={styles.backContainer}>
                    {/* Back-button to move to previous week*/}
                    <Ionicons 
                      name='caret-back-outline' 
                      color={'#cfb3e9'} 
                      size={30} 
                      onPress={handleBackPress}>
                    </Ionicons>
                </View>
                <View style={styles.forwardContainer}>
                    {/* Forward-button to move to next week*/}
                    <Ionicons 
                      name='caret-forward-outline' 
                      color={'#cfb3e9'} 
                      size={30} 
                      onPress={handleBackPress}>
                    </Ionicons>
                </View>
            </View>
            <View>
                {/* Chart that visually shows the number of times exercised for a given week */}
                <BarChart
                    data={chartData}
                    width={windowWidth}
                    height={200}
                    yAxisLabel=''
                    yAxisSuffix=''
                    chartConfig={chartStyle}
                />
            </View>
            <View style={styles.logProgContainer}>
                {/* A button that, when pushed, goes to the progress screen */}
                <Button title = 'Log Progress' 
                    buttonStyle = {{
                        justifyContent: 'center', 
                        backgroundColor: '#136A4A', 
                        alignSelf: 'stretch',
                        borderRadius: 8
                      }}
                    titleStyle = {{
                        fontSize: 18, 
                        fontWeight: 'normal', 
                        color: '#e6e6e6'
                      }}
                    onPress={() => handleLogProgPress()}
                />
            </View>
        </View>
        <View>
          <View style={styles.workoutHeaderContatiner}>
            {/* Header for the workouts part of the profile page */}
            <Text adjustsFontSizeToFit={true} style={styles.workoutHeaderText}> 
              WORKOUTS 
            </Text>
          </View>
          <View style={styles.chooseWorkoutContainer}>
            {/* Buttons to filter which workouts that are shown */}
            <View style={{flex: 1}}>
              <Button title = 'Mine' 
                  buttonStyle = {{
                      justifyContent: 'center', 
                      backgroundColor: myButtonColor, 
                      alignSelf: 'stretch'
                    }}
                  titleStyle = {{
                      fontSize: 18, 
                      fontWeight: 'normal', 
                      color: '#e6e6e6'
                    }}
                  onPress={() => handleMinePress()}
              />
            </View>
            <View style={{flex: 1}}>
              <Button 
                  title = 'Saved' 
                  buttonStyle = {{
                      justifyContent: 'center', 
                      backgroundColor: savedButtonColor, 
                      alignSelf: 'stretch'
                    }}
                  titleStyle = {{
                      fontSize: 18, 
                      fontWeight: 'normal', 
                      color: '#e6e6e6'
                    }}
                  onPress={() => handleSavedPress()}
              />
            </View>
          </View>
        </View>
        {/* The workout feed */}
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
  progColumnContainer: {
    padding: '1%',
    height: 360,
    width: windowWidth,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  progHeaderContatiner: {
      padding: '1%',
      height: 60,
      width: windowWidth,
      justifyContent: "center",
      alignItems: "center",
  },
  progHeaderText: {
      fontSize: 40,
      fontWeight: '900',
      letterSpacing: 2,
      color: '#DC6247',
  },
  progRowContainer: {
      marginTop: '1%',
      flexDirection: "row",
      alignItems: "center",
      width: windowWidth,
  },
  backContainer: {
      width: '15%',
      padding: '1%',
      height: 40,
      justifyContent: "flex-end",
      alignItems: 'flex-end',
  },
  forwardContainer: {
      width: '15%',
      padding: '1%',
      height: 40,
      justifyContent: "flex-end",
      alignItems: 'flex-start',
  },
  chartTitleContainer: {
      width: '70%',
      height: 40,
      justifyContent: "center",
      alignItems: "center",
  },
  chartTitle: {
      fontSize: 20,
      fontWeight: 'normal',
      color: '#cfb3e9',
  },
  logProgContainer: {
      padding: '1%',
      height: 60,
      alignSelf: "flex-end",
      justifyContent: "center",
  },
  workoutHeaderContatiner: {
    padding: '1%',
    height: 60,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212"
  },
  workoutHeaderText: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#DC6247',
  },
  chooseWorkoutContainer: {
    padding: '1%',
    height: 50,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: '#121212',
  },
})
export default ProfileScreen;
