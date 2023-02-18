import { Button } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import React, { useRef } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { auth } from '../../firebase';
import FeedsContainer from './feeds/FeedsContainer';

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
      </SafeAreaView>
      {/* This is the feed section */}
      <View>
        <FeedsContainer ref={childRef}></FeedsContainer>
      </View>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  feedTab: {
    padding: 10,
    borderBottomWidth: 2,
    marginTop: 30,
  },
  feedTabText: {
    fontSize: 28,
  }
})
export default HomeScreen;

