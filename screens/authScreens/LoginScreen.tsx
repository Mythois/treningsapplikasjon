import { Button, Text } from '@rneui/themed';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, StyleSheet, View } from 'react-native';
import { auth } from '../../firebase';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.navButtonContainer}>
        <Button 
        title="< Back"
        titleStyle={{color:"#25A073", fontWeight: 'bold'}}
        onPress={navigation.goBack}
        containerStyle={{borderRadius: 5}}
        buttonStyle={{borderColor: "#25A073",
      borderWidth: 2, borderRadius: 5}}
        type="outline"
        />
      </View>
      <Text adjustsFontSizeToFit={true} 
      style={{fontSize: 40, fontWeight: 'bold',
      textAlign: 'left', color: 'lightgray', width: '100%', 
      paddingLeft: 20}}>
      WELCOME BACK
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"gray"}
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"gray"}
          onChangeText={text => setPassword(text)}
          value={password}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Sign in"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={{
            backgroundColor: '#25A073',
            borderRadius: 5,
            height: 55,
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
          containerStyle={{
            marginHorizontal: 50,
            height: 55,
            width: '90%',
          }}
          onPress={() => signInWithEmailAndPassword(auth, email, password)
          .catch(error => alert("Incorrect email or password. Try again."))}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    marginTop: 20,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    borderColor: "gray",
    borderWidth: 3,
    color: "white"
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  navButtonContainer: {
    marginTop: 40,
    width: '100%',
    alignItems: 'flex-start',
    padding: 20,
  }
});

export default LoginScreen;
