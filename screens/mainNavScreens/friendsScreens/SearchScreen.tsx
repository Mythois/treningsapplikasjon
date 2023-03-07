import { Avatar, Icon, Input } from '@rneui/themed';
import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { WorkoutUser } from '../../../LocalData/Users/WorkoutUser';
import { LocalData } from '../../../LocalData/LocalData';

// Export page
export default function SearchScreen({navigation}) {
    const [users, setUsers] = React.useState<WorkoutUser[]>([]);
    const [search, setSearch] = React.useState('');

    const renderItem = ({ item }: { item: WorkoutUser }) => (
        <TouchableOpacity 
        style={{ flexDirection: 'row', justifyContent:"space-around", alignContent:"flex-start",
        paddingLeft:28, paddingVertical: 8, flex: 1, width:"100%", alignItems:"center"}}
        onPress={() => {
            if (item.id == LocalData.currentUser.id) {
                navigation.navigate('Profile')
            } else {
                navigation.navigate('FriendProfileScreen', { user: item })
            }
        }}>
            <Avatar
            rounded
            icon={{
            name: 'person-outline',
            type: 'material',
            size: 26,
            }}
            containerStyle={{ backgroundColor: '#c2c2c2' }}
            />
            <View style={{ flex: 1, marginLeft: 16, width:"100%" }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ color: 'white' }}>{item.isFollowingUser() ? item.username + " · Following" : item.username + ""}</Text>
            </View>
            <View style={{ flex: 1, width: "100%", alignContent:"flex-end"}}>
                <Icon type='font-awesome' name="chevron-right" size={20} color="white"/>
            </View>
        </TouchableOpacity>
      );
      

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Input style={styles.input}
                placeholder='Search...'
                leftIcon={{ type: 'font-awesome', name: 'search', size: 20, color: '#25A073'}}
                value={search}
                onChangeText={text => {
                    setSearch(text);
                    if (text !== '') {
                        if (!LocalData.usersCollection.loaded) {
                            LocalData.usersCollection.load((firUsers) => {
                                setUsers(LocalData.usersCollection.searchUsers(text));
                            })
                        } else {
                            setUsers(LocalData.usersCollection.searchUsers(text));
                        }
                    } else {
                        setUsers([]);
                    }
                }}
                />
            </View>
            {users && users.length > 0 ? (
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    directionalLockEnabled={true}
                    horizontal={false}
                />
            ) : (
                <Text style={{color: "white"}}>{(search.length > 1 ? "No users found" : "Type in two or more characters to search.")}</Text>
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
