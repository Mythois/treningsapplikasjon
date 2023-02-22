import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import FeedsListItem from './FeedsListItem';

// Placeholder for feeds
const Feeds = [
    {
        id: Math.random(),
        userID: 'you',
        name: 'New workout program',
        date: new Date(),
        likedBy: ['dsfs', 'sdfjsf', '83724', '3423'],
    },
];


function GenerateFeed() {
    function GerenerateRandomNumberOfStringsInAnArray() {
        let array = [];
        for (var i = 0; i < Math.floor(Math.random()*100); i++) {
            array.push('a');
        };
        return array;
    }
    const feed = {
        id: Math.random(),
        userID: 'you',
        name: 'New workout program',
        date: new Date(),
        likedBy: GerenerateRandomNumberOfStringsInAnArray(),
    };
    return feed;
}

interface Filters {
    typeOfFeed: String,
    isImage: boolean,
}

const defaultFilters: Filters = { typeOfFeed: 'All', isImage: false }


function FeedsContainer(props, ref) {

    // Contains the current items
    const [itemsState, setItems] = useState([]);
    useEffect(() => {
        refresh();
    }, []);

    // Managing what to load
    const [loadFilters, setFilters] = useState(defaultFilters);

    // Refreshes all items in the item list
    function refresh() {
        setItems([]);
        for (var i = 0; i < 10; i++) {
            loadNewItems();
        }
        alert('refreshed');
    }

    // Fetch new feed from database without deleting the existing ones        <---------------- Must make a better load function
    function loadNewItems() {
        setItems(currentItems => [...currentItems, GenerateFeed()]);

        // If nothing is returned, then tell the user that there are no more feeds
    }

    function isCloseToBottom({ contentOffset, contentSize, layoutMeasurement }) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000;
    }

    // Allow the parent to call refresh
    useImperativeHandle(ref, () => ({
        refresh: () => { refresh() }
    }));

    return (
        <View style={styles.container}>
            <ScrollView onScroll={({ nativeEvent }) => { if (isCloseToBottom(nativeEvent)) { loadNewItems() } }} scrollEventThrottle={16}>
                <FlatList style={styles.list} data={itemsState} numColumns={2} renderItem={({ item }) => (
                    <FeedsListItem name={item.name} text={'This text contains the content of the program'} likes={item.likedBy.length}></FeedsListItem>
                )} />
            </ScrollView>
        </View>
    )
};

export default forwardRef(FeedsContainer);

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(12, 12, 12)',
        height: windowHeight - 80 - 20,
    },
    list: {
        position: 'relative',
    },
});