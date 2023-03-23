import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity, Dimensions, TouchableHighlight, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LocalData } from '../../../LocalData/LocalData';
import { ProgramData } from '../../../LocalData/Programs/ProgramData';


interface Props {
    name: string,
    text: string,
    contentText: string,
    likes: string[],
    date: Date,
    setItemsList,
    fullItemsList,
    updateBookmark: (id: string) => void,
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

    useEffect(() => {
        if (checkIfUserBookmarked()) {
            setIcon('bookmark');
            console.log('checked bookmark');
        }
    }, []);

    // Runs when the user presses the header of this item
    const handlePressName = () => {
        //alert(data.name)
        setModalVisible(true);
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
        if (checkIfUserBookmarked()) {
            setIcon('bookmark-outline');
            // remove user from likeState
            setLike((prevList) => prevList.filter((prevItem) => prevItem != LocalData.currentUser.id));
            data.setItemsList(data.fullItemsList);
        } else {
            setIcon('bookmark');
            setLike(likeState => [...likeState, LocalData.currentUser.id]);
        }
        // update database
        data.updateBookmark(LocalData.currentUser.id);
    }

    function checkIfUserBookmarked() {
        const user = LocalData.currentUser.id;
        for (let item of likeState) {
            if (user == item) {
                console.log('user has already liked program');
                return true;
            }
        }
        return false;
    }

    const [modalVisible, setModalVisible] = useState(false);

    function StylableAlert({ visible, title, message, date }) {


        const handleClose = () => {
            setModalVisible(false);
        };

        function dateToString(date) {
            return date.toString();
        }

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleClose}
            >
                <View style={modalStyles.modalBackground}>
                    <View style={modalStyles.modalContainer}>
                        <Text style={modalStyles.modalTitle}>{title}</Text>
                        <Text style={modalStyles.modalIntro}>Your fantastic program!</Text>
                        <Text style={modalStyles.modalMessage}>{message}</Text>
                        <Text style={modalStyles.modalContentDate}>{date.toString()}</Text>
                        <TouchableHighlight style={modalStyles.modalButton} onPress={handleClose}>
                            <Text style={modalStyles.modalButtonText}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
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
                {likeState.length}
            </Text>
            <StylableAlert visible={false} title={data.name} message={data.contentText} date={data.date}></StylableAlert>
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
        color: '#25A073',
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

const windowHeight = Dimensions.get('window').height;
const windowWidth1 = Dimensions.get('window').width;


const modalStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#0e0e0e',
        borderRadius: 10,
        padding: 20,
        minWidth: 300,
        height: windowHeight - 200,
        width: windowWidth1 * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    modalIntro: {
        fontSize: 16,
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        color: '#fff',
        margin: 30,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#25A073',
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContentDate: {
        fontSize: 12,
        marginBottom: 20,
        color: '#aaa',
        textAlign: 'center',
    }
});
