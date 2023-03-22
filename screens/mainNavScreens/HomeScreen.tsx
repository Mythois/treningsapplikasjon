import { Button } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import React, { useRef } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { auth } from '../../firebase';
import FeedsContainer from './feeds/FeedsContainer';

function HomeScreen({ navigation }) {

  // Refers to the feeds container for controling the feeds
  const childRef: any = useRef();

  // Refreshes the page based on which tab is pressed
  function handlePressTopTab(tab: string) {
    childRef.current.refresh(tab);
  }

  return (
    <View style={styles.container}>
      {/* This is the top section */}
      <SafeAreaView style={styles.headerConteiner}>
        <ScrollView horizontal={true}>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab('all'))}>
            <Text style={styles.feedTabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab('discover'))}>
            <Text style={styles.feedTabText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab('friends'))}>
            <Text style={styles.feedTabText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab('groups'))}>
            <Text style={styles.feedTabText}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab('myOwn'))}>
            <Text style={styles.feedTabText}>My own</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedTab} onPress={() => (handlePressTopTab('bookmarked'))}>
            <Text style={styles.feedTabText}>Bookmarked</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      {/* This is the feed section */}
      <View>
        <FeedsContainer ref={childRef}></FeedsContainer>
      </View>
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
    fontWeight: '900',
    letterSpacing: 2,
    color: '#DC6247',
  },
  headerConteiner: { //Added to maybe add logo to the top

  },
})

export default HomeScreen;

