import { Button, Text } from '@rneui/themed';
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
    
    const [loading, setLoading] = useState(false);

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
      WELCOME!
      </Text>
      <Text adjustsFontSizeToFit={true} 
      style={{fontSize: 18, fontWeight: 'regular',
      textAlign: 'left', color: 'lightgray', width: '100%',
      marginBottom: 5, paddingLeft: 20}}>
      Start your journey here
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
        placeholderTextColor={"gray"}
          placeholder="Name*"
          onChangeText={text => setName(text)}
          value={name}
          style={styles.input}
        />
        <TextInput
        placeholderTextColor={"gray"}
          placeholder="Username*"
          onChangeText={text => setUsername(text)}
          value={username}
          style={styles.input}
        />
        <TextInput
        placeholderTextColor={"gray"}
          placeholder="Email*"
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
        placeholderTextColor={"gray"}
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
          loading={loading}
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
          onPress={async () => {
            setLoading(true);
            await createUser(name, username, email, password);
            setLoading(false);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

// Styles for screen
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
    marginTop: 30,
  },
  navButtonContainer: {
    marginTop: 40,
    width: '100%',
    alignItems: 'flex-start',
    padding: 20,
  }
});

/**
 * Class defined to be able to cache checked usernames, 
 * to avoid server overload.
 */
class UsernameChecks {
    static usernamesChecked: string[] = [];
}

async function createUser(name: string, username: string,
  email: string, password: string) {
    if (checkForm(name,username,email,password) === false) { return; }

    // Checking whether username is taken
    // Here I am creating a query for all data matching the "where" constraint
    // If the query is not empty, then the username must be taken
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q)
    .then(data => {
      if (!data.empty) {
        console.log("Username found existing.");
        alert("Username is taken.")
      
        UsernameChecks.usernamesChecked.push(username);
      } else { 
        // Only allow creating user if one can check that a username is not already taken
        createUserWithEmailAndPassword(auth, email, password)
                .then(async userCredentials => {
                    const userRef = doc(db, "users", userCredentials.user.uid);
                    await setDoc(userRef, {
                        "name": name,
                        "username": username,
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => alert(error.message))
      }
    })
    .catch(error => {
      console.log(error.message)
      console.log("Error checking usernames.");
      
      return false;
    });
  }

/**
 * Checks whether the form is valid
 */
function checkForm(name: string, username: string,
    email: string, password: string): boolean {
    
    // Check whether there are any input at all
    if (name.length === 0 || username.length === 0 || email.length === 0 || password.length === 0) {
      console.log("Fields are not filled.");    
      return false;
    }

    // Checking whether username has already been confirmed taken
    if (UsernameChecks.usernamesChecked.includes(username)) {
      console.log("Username already checked exists");
      alert("Username is taken.")
      return false;
    }
}
  

export default RegisterScreen;