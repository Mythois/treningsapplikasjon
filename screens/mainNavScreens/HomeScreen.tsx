import { Button } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import { auth } from '../../firebase';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* This is the top section */}
      <SafeAreaView>
        <ScrollView horizontal={true}>
          <View style={styles.feedTab}>
            <Text style={styles.feedTabText}>All</Text>
          </View>
          <View style={styles.feedTab}>
            <Text style={styles.feedTabText}>Discover</Text>
          </View>
          <View style={styles.feedTab}>
            <Text style={styles.feedTabText}>Friend</Text>
          </View>
          <View style={styles.feedTab}>
            <Text style={styles.feedTabText}>Group</Text>
          </View>
          <View style={styles.feedTab}>
            <Text style={styles.feedTabText}>Myself</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* This is the feed section */}
      <View>

      </View>
      <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold'}}
                >
                    This is the home screen.
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

