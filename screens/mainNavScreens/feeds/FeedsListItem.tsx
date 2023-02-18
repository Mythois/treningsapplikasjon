import React, { useState } from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    name: String,
    text: String,
    likes: number,
}

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
                <Text>
                    {data.name}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressContent}>
                <Text>
                    {data.text}
                </Text>
            </TouchableOpacity>
            <Ionicons name={iconState} size={25} onPress={handlePressLike}/>
            <Text>
                {data.likes.toString()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        margin: 8,
        padding: 7,
    }
});