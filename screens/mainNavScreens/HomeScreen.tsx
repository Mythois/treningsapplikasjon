import { Button } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { auth } from '../../firebase';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text> Hei! </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
})
export default HomeScreen;

