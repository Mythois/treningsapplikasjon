import React, { useState } from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    name: String,
    description: String,
    //likes: number,
}

// Gets window width to be used in item width, each item has to be less than half the window width
const windowWidth = Dimensions.get('window').width;

// This is an item component that represents a single item in the GroupsContainer
export default function GroupsListItem(data: Props) {

    // Runs when the user presses the header of this item
    const handlePressName = () => {
        alert(data.name)
    };

    // Runs when the user presses the content of this item
    const handlePressContent = () => {
        alert(data.description)
    }

    return (
        <View style={[styles.container, styles.elevation]}>
            <TouchableOpacity onPress={handlePressName} style={styles.top}>
                <Text style={styles.header}>
                    {data.name}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.content} onPress={handlePressContent}>
                <Text style={styles.contentText}>
                    {data.description}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
        margin: 12,
        width: (windowWidth) - 40,
        flex: 1,
        borderRadius: 15,
    },
    header: {
        color: '#e6e6e6',
        fontSize: 20,
    },
    top: {
        backgroundColor: '#303030',
        padding: 5,
        paddingLeft: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    content: {
        margin: 20,
        color: '#e6e6e6',
    },
    contentText: {
        color: '#e6e6e6',
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 20,
        shadowColor: '#000000',
    },
});
