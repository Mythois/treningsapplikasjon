import { Input } from '@rneui/themed';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WorkoutUser } from '../../LocalData/Users/WorkoutUser';
import { LocalData } from '../../LocalData/LocalData';

// Export page
export default function SearchScreen({navigation}) {
    const [users, setUsers] = React.useState<WorkoutUser[]>([]);
    const [search, setSearch] = React.useState('');

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Input style={styles.input}
                placeholder='Search...'
                leftIcon={{ type: 'font-awesome', name: 'search', size: 20, color: '#25A073'}}
                onChangeText={text => {
                    setSearch(text);
                    if (text !== '') {
                        console.log(text);
                        if (!LocalData.usersCollection.loaded) {
                            LocalData.usersCollection.load((firUsers) => {
                                setUsers(LocalData.usersCollection.searchUsers(search));
                            })
                        } else {
                            console.log(LocalData.usersCollection.searchUsers(search));
                            setUsers(LocalData.usersCollection.searchUsers(search));
                        }
                    } else {
                        setUsers([]);
                    }
                }}
                />
            </View>
            <Text style={{color:'white'}}>
                {LocalData.currentUser.username}
            </Text>
            {users && users.length > 0 ? (
                <ul>
                {users.map((user, index) => (
                  <li key={index}>
                    <Text style={{color: "white"}}>{user.username}</Text>
                  </li>
                ))}
              </ul>
            ) : (
                <Text style={{color: 'white'}}>No users found.</Text>
            )}
        </View>
    );
}

// Stylesheet
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1,
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%',
        marginTop: 50,
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: '100%',
        color: "white"
    },
});
