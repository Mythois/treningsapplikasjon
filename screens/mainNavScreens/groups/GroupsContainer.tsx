import { async } from '@firebase/util';
import { Component, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { LocalData } from '../../../LocalData/LocalData';
import { ProgramData } from '../../../LocalData/Programs/ProgramData';
import GroupsListItem from './GroupsListItem';
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
function GroupsContainer(props, ref) {

    // This ref is used to refer to the scrollview so that we know when the user scrolled to the bottom to generate new feed
    const scrollRef: any = useRef();

    // Contains the current items
    const groups: string[] = [];
    const [itemsState, setItems] = useState(groups);
    const [currentItemsState, setCurrentItems] = useState(groups);

    // Managing what to load                                               <---------------------- this is made for later functions
    const [filterState, setFilters] = useState(defaultFilters);
    const [filteredItemsState, setFilteredItems] = useState([]);


    // Refreshes all items in the item list
    function refresh(type: string) {

        // Scroll back to top when a new tab is pressed
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });

        // Reloads the feeds from the database
        LocalData.programCollection.load(() => {
            setItems(LocalData.currentUser.groups); // <------------------------ Put everything here
            currentUserID = LocalData.currentUser.id;
            setCurrentItems(LocalData.currentUser.groups);
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
            <ScrollView ref={scrollRef} onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    //loadNewItems() 
                }
            }} scrollEventThrottle={16}>
                <View style={{
                    //height: windowHeight 
                }}>
                    <FlatList style={styles.list} data={currentItemsState} numColumns={2} renderItem={({ item }) => (
                        <FeedsListItem name={item.name} text={item.date.toString()} likes={item.likedBy.length}></FeedsListItem>
                    )} />
                </View>

            </ScrollView>
        </View>
    )
};

export default forwardRef(GroupsContainer);

// Get window heigh to decide the height of the container
const windowHeight = Dimensions.get('window').height;


// Styles 
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(12, 12, 12)',
        height: windowHeight - 80 - 20,
    },
    list: {
        position: 'relative',
    },
});