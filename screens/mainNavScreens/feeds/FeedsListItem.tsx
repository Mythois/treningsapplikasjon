import React, { useState } from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    name: String,
    text: String,
    likes: number,
    updateBookmark: () => void,
}

// Gets window width to be used in item width, each item has to be less than half the window width
const windowWidth = Dimensions.get('window').width;

// This is an item component that represents a single item in the FeedsContainer
// It contains a header, content and a like button
export default function FeedsListItem(data: Props) {

    // This holds the icon that gets displayed, it can have two different states, 'bookmark' or 'bookmark-outline'
    const [iconState, setIcon] = useState('bookmark-outline');

    // This handles the like state, allows the user to increase like count of decrease(unlike)
    const [likeState, setLike] = useState(data.likes);

    // Managing what to save to bookmarked
    const [bookmarksState, setBookmarks] = useState([]);
    
    // Runs when the user presses the header of this item
    const handlePressName = () => {
        alert(data.name)
    };

    // Runs when the user presses the content of this item
    const handlePressContent = () => {
        alert(data.text)
    }

    // Runs when the user presses the bookmark icon
    // Changes the state of the icon
    // Increase in the like count if not already liked, decreases if the opposite
    // Add user to likedBy in the database for the program                         <--------------------- Not implemented yet
    const handlePressLike = () => {
        // Toggle between like and unlike
        if (iconState === 'bookmark') {
            setIcon('bookmark-outline');
            setLike(data.likes);
        } else {
            setIcon('bookmark');
            setLike(data.likes + 1);
        }
        data.updateBookmark();
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
                    {data.text}
                </Text>
            </TouchableOpacity>
            <Ionicons name={iconState} style={styles.likesIcon} size={20} onPress={handlePressLike} />
            <Text style={styles.likesText}>
                {likeState}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#404040',
        margin: 12,
        width: (windowWidth / 2) - 40,
        flex: 1,
        borderRadius: 15,
    },
    header: {
        color: '#e6e6e6',
        fontSize: 20,
    },
    top: {
        backgroundColor: 'rgba(40, 40, 40, 0.3)',
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
