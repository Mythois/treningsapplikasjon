import { Button } from '@rneui/themed';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, StyleSheet, View } from 'react-native';
import { auth, db } from '../../firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

// --- RegisterScreen
function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name*"
          onChangeText={text => setName(text)}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder="Username*"
          onChangeText={text => setUsername(text)}
          value={username}
          style={styles.input}
        />
        <TextInput
          placeholder="Email*"
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Password*"
          onChangeText={text => setPassword(text)}
          value={password}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Register"
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
          onPress={() => {
            if (checkForm(name, username, email, password)) {
                createUserWithEmailAndPassword(auth, email, password)
                .then(async userCredentials => {
                    const userRef = doc(db, "users", userCredentials.user.uid);
                    await setDoc(userRef, {
                        "name": name,
                        "username": username,
                    });
                })
                .catch(error => alert(error.message))
            } else {
                alert("Invalid input.")
            }
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

// Styles for screen
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    marginTop: 30,
  },
});

/**
 * Class defined to be able to cache checked usernames, 
 * to avoid server overload.
 */
class UsernameChecks {
    static usernamesChecked: string[] = [];
}
/**
 * Checks whether the form is valid
 */
async function checkForm(name: string, username: string,
    email: string, password: string): Promise<boolean> {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (name.length === 0 || username.length === 0 ||
        email.length === 0 || password.length === 0) {
      return false;
    }
    
    // Checking whether there is a valid email input
    if (!emailRegex.test(email)) {
      return false;
    }

    // Checking whether username has already been confirmed taken
    if (UsernameChecks.usernamesChecked.includes(username)) { 
        return false;
    }
    // Checking whether username is taken
    // Here I am creating a query for all data matching the "where" constraint
    // If the query is not empty, then the username must be taken
    const q = query(collection(db, "cities"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        UsernameChecks.usernamesChecked.push(username);
        return false;
    }
    
    return true;
}
  

export default RegisterScreen;