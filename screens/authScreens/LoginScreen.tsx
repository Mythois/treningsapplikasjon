import { Button } from '@rneui/themed';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, StyleSheet, View } from 'react-native';
import { auth } from '../../firebase';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
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
          onPress={() => signInWithEmailAndPassword(auth, email, password)
          .catch(error => alert("Incorrect email or password. Try again."))}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  inputContainer: {
    width: '90%',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});

export default LoginScreen;
