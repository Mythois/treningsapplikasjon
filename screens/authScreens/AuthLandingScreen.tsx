import { Button } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * Auth landing screen. Here the user can choose between
 * logging in and registering a new user.
 */
function AuthLandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <Button 
      title="Sign in"
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
        marginVertical: 10,
      }}
      onPress={() => navigation.navigate("Login")}
    />
    <Button style={{flex: 1}}
      title="Register"
      loading={false}
      loadingProps={{ size: 'small', color: 'white' }}
      type="outline"
      buttonStyle={{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '0,0,0,1',
        height: 55,
      }}
      titleStyle={{ color: 'rgba(0,0,0,1)', fontWeight: 'regular', fontSize: 18 }}
      containerStyle={{
        marginHorizontal: 50,
        height: 55,
        width: '90%',
        marginVertical: 10,
      }}
      onPress={() => navigation.navigate("Register")}
    />
      </View>
    </View>
    );
};

// --- Styles
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
  });

export default AuthLandingScreen;
