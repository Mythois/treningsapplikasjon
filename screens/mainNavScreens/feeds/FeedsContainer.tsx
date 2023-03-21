import { async } from '@firebase/util';
import { Component, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { LocalData } from '../../../LocalData/LocalData';
import { ProgramData } from '../../../LocalData/Programs/ProgramData';
import FeedsListItem from './FeedsListItem';
import { useFocusEffect } from '@react-navigation/native';

// Filters for feeds that change what feeds to display
interface Filters {
    typeOfFeed: string,
    isImage: boolean,
}

// Default filters has the type of 'all'
const defaultFilters: Filters = { typeOfFeed: 'all', isImage: false };
let currentUserID: string = '';

// This is container for the whole feed section
// It contain functions to filter the feeds, get new feeds from loaded programs
function FeedsContainer(props, ref) {

    // This ref is used to refer to the scrollview so that we know when the user scrolled to the bottom to generate new feed
    const scrollRef: any = useRef();

    // Contains the current items
    const programs: ProgramData[] = [];
    const [itemsState, setItems] = useState(programs);
    const [currentItemsState, setCurrentItems] = useState(programs);

    // Managing what to load                                               <---------------------- this is made for later functions
    const [filterState, setFilters] = useState(defaultFilters);
    const [filteredItemsState, setFilteredItems] = useState([]);



    // Runs at the beginning of the home screen to generate feeds
    useEffect(() => {
        refresh(defaultFilters.typeOfFeed);
    }, []);

    useEffect(() => {
        setCurrentItems(itemsState);
        setCurrentItems(resultAfterFilter());
    }, [filterState]);

    // Refreshes all items in the item list
    function refresh(type: string) {

        // Scroll back to top when a new tab is pressed
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });

        // Reloads the feeds from the database
        LocalData.programCollection.load(() => {
            setItems(LocalData.programCollection.getPrograms()); // <------------------------ Put everything here
            currentUserID = LocalData.currentUser.id;
            setCurrentItems(LocalData.programCollection.getPrograms());
            console.log(type);
            console.log(filterState);
            console.log(currentItemsState);
        });

        // Set filterState based on input from parent component
        let filter: Filters = { typeOfFeed: type, isImage: false }
        setFilters(filter);
        console.log(filterState);

        // Refreshes the items by setting itemsState to be empty
        setCurrentItems([]);

        console.log('refreshed');
    }

    function findOneMissingProgram(arr1: ProgramData[], arr2: ProgramData[]): ProgramData {
        if (currentItemsState !== undefined || currentItemsState.length != 0) {
            if (arr1.every((i) => i instanceof ProgramData) && arr2.every((i) => i instanceof ProgramData)) {
                for (const item of arr1) {
                    if (!arr2.some((i) => i.id === item.id)) {

                        console.log('added unique item to current');
                        setCurrentItems(currentItems => [...currentItems, item]);
                        return
                    }
                }
            }
        } else {
            console.log('added new item to current');
            setCurrentItems(currentItems => [...currentItems, itemsState[0]])
            return
        }
    }

    function loadTenInitialItemsFromFilteredItems() {
        console.log('starts to load inital items');
        let items: ProgramData[] = [];
        for (let i = 0; i < 11; i++) {
            console.log(items.length);
            for (const item of filteredItemsState) {

                if (!items.some((i) => i.id === item.id)) {


                    items.push(item);
                    i = i + 1;
                }
            }

        }
        return items;
    }

    // Unused function
    // Get new program from programCollection without deleting the existing ones
    function loadNewItems() {

        setCurrentItems(currentItems => [...currentItems, findOneMissingProgram(itemsState, currentItemsState)]);

        // Check if the item fulfils the requirements from filter

        // findOneMissingProgram(currentItemsState, itemsState);

        // console.log('ho');
        // console.log(currentItemsState);
        // for (const item of itemsState) {
        //     if (!currentItemsState.includes(item)) {

        //     }



        //     if (item && item instanceof ProgramData && item.id) {

        //         if (currentItemsState !== undefined && currentItemsState.length != 0) {
        //             for (var currentItem of currentItemsState) {
        //                 if (item.id != currentItem.id) {
        //                     setCurrentItems(currentItems => [...currentItems, item]);
        //                     console.log('loaded new item');
        //                     break
        //                 }
        //             }
        //         } else {
        //             setCurrentItems([item]);

        //         }

        //     }
        // }

        // If nothing is returned, then tell the user that there are no more feeds
    }

    function updateBookmarksInDatabase(id: string) {
        console.log('updateDatabase');
    }

    function resultAfterFilter() {
        let filteredItems: ProgramData[] = [];
        if (filterState.typeOfFeed == 'myOwn') {
            for (var item of itemsState) {
                if (item.userID == currentUserID) {
                    filteredItems.push(item);
                    console.log('filtered an item');
                }
            }
        } else {
            filteredItems = itemsState;
        }
        return filteredItems;
        //setFilteredItems(filteredItems);
    }

    function isCloseToBottom({ contentOffset, contentSize, layoutMeasurement }) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 2000;
    }

    // Allow the parent to call refresh
    useImperativeHandle(ref, () => ({
        refresh: (type) => { refresh(type) }
    }));

    return (
        <View style={styles.container}>
            <View>
                {/*<Text style={{color: '#e6e6e6'}}>HI</Text>*/}
            </View>
            <ScrollView nestedScrollEnabled={true} ref={scrollRef} onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    //loadNewItems() 
                }
            }} scrollEventThrottle={16}>
                <View style={{
                    //height: windowHeight 
                }}>
                    <FlatList style={styles.list} data={currentItemsState} numColumns={2} renderItem={({ item }) => (
                        <FeedsListItem name={item.name} text={item.date.toString()} likes={item.likedBy} updateBookmark={updateBookmarksInDatabase}></FeedsListItem>
                    )} />
                </View>

            </ScrollView>
        </View>
    )
};

export default forwardRef(FeedsContainer);

// Get window heigh to decide the height of the container
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