import { Button, Image, Text } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

/**
 * Auth landing screen. Here the user can choose between
 * logging in and registering a new user.
 */
function AuthLandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/man_running.jpg")}
        containerStyle={styles.item}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.buttonContainer}>
        <Text adjustsFontSizeToFit={true}
          style={{
            fontSize: 32, fontWeight: 'bold',
            textAlign: 'center', color: 'gray', width: '100%',
            marginBottom: 10
          }}>
          TAKE THE FIRST STEP
        </Text>

        <Button
          title="Sign in"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={{
            backgroundColor: '#25A073',
            borderRadius: 5,
            height: 55,
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}
          containerStyle={{
            marginHorizontal: 50,
            height: 55,
            width: '90%',
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("Login")}
        />
        <Button style={{ flex: 1 }}
          title="Register"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          type="outline"
          buttonStyle={{
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#25A073',
            height: 55,
          }}
          titleStyle={{ fontWeight: 'regular', fontSize: 18, color: '#25A073' }}
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
    alignItems: 'center',
    backgroundColor: '#121212',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  item: {
    marginTop: 80,
    aspectRatio: 1,
    width: '90%',
    borderRadius: 5,
  },
});

export default AuthLandingScreen;
