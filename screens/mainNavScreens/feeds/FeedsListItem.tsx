import React, { useState } from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    name: String,
    text: String,
    likes: number,
}

const windowWidth = Dimensions.get('window').width;

export default function FeedsListItem(data: Props) {
    const [iconState, setIcon] = useState('heart-outline');
    const handlePressName = () => {
        alert(data.name)
    };
    const handlePressContent = () => {
        alert(data.text)
    }
    const handlePressLike = () => {
        // Toggle between like and unlike
        if(iconState === 'heart') {
            setIcon('heart-outline')
        } else {
            setIcon('heart')
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePressName}>
                <Text style={styles.header}>
                    {data.name}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.content} onPress={handlePressContent}>
                <Text>
                    {data.text}
                </Text>
            </TouchableOpacity>
            <Ionicons name={iconState} style={styles.likesIcon} size={20} onPress={handlePressLike}/>
            <Text style={styles.likesText}>
                {data.likes.toString()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#404040',
        margin: 12,
        padding: 7,
        width: (windowWidth / 2) - 40,
        flex: 1,
        borderRadius: 15,
    },
    header: {
        color: '#cccccc',
        fontSize: 20,
    },
    content: {
        
    },
    likesIcon: {
        color: '#cccccc',
        position: 'absolute',
        right: 30,
        bottom: 8,
        zIndex: 3,
        elevation: 3,
    },
    likesText: {
        color: '#909090',
        fontSize: 13,
        position: 'absolute',
        right: 10,
        bottom: 10,
        zIndex: 3,
        elevation: 3,
    }
});