import { Button, Image, Avatar } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import React, { useRef } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { auth } from '../../firebase';
import FeedsContainer from './feeds/FeedsContainer';
import { LocalData } from '../../LocalData/LocalData';
import SmallHeaderContent from './profile/SmallHeaderContent';

function HomeScreen({ navigation }) {

  // Controling the feeds
  const childRef: any = useRef();

  function handlePressTopTab() {
    childRef.current.refresh();
  }

  return (
    <View style={styles.container}>
      {/* This is the top section */}
      <SafeAreaView>
        <SmallHeaderContent user={LocalData.currentUser} ref={childRef} navigation={navigation}></SmallHeaderContent>
            
            {/* Other stuff */}
        
        <ScrollView horizontal={true}>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab())}>
            <Text style={styles.feedTabText}>My own</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      {/* This is the feed section */}
      <View>
        <FeedsContainer ref={childRef}></FeedsContainer>
      </View>
      {/* <Text
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
    marginTop: 8,
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
export default HomeScreen;

