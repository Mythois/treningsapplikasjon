import { async } from '@firebase/util';
import { Component, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { LocalData } from '../../../LocalData/LocalData';
import { ProgramData } from '../../../LocalData/Programs/ProgramData';
import FeedsListItem from './FeedsListItem';

// Filters for feeds that change what feeds to display
interface Filters {
    typeOfFeed: string,
    isImage: boolean,
}

// Default filters has the type of 'all'
const defaultFilters: Filters = { typeOfFeed: 'all', isImage: false }

// This is container for the whole feed section
// It contain functions to filter the feeds, get new feeds from loaded programs
function FeedsContainer(props, ref) {

    // This ref is used to refer to the scrollview so that we know when the user scrolled to the bottom to generate new feed
    const scrollRef: any = useRef();

    // Contains the current items
    const programs: ProgramData[] = [];
    const [itemsState, setItems] = useState(programs);
    const [currentItemsState, setCurrentItems] = useState(programs);
    
    // Runs at the beginning of the home screen to generate feeds
    useEffect(() => {
        refresh(defaultFilters.typeOfFeed);
    }, []);

    // Managing what to load                                               <---------------------- this is made for later functions
    const [filterState, setFilters] = useState(defaultFilters);

    // Refreshes all items in the item list
    function refresh(type: string) {
        
        // Scroll back to top when a new tab is pressed
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });

        // Refreshes the items by setting itemsState to be empty
        setItems([]);

        // Reloads the feeds from the database
        LocalData.programCollection.load(() => {});
        setItems(LocalData.programCollection.getPrograms());

        console.log(itemsState);

        // Set filterState based on input from parent component
        let filter: Filters = {typeOfFeed: type, isImage: false}
        // Current only 'all' and 'myOwn' types are available for use
        if (type == 'myOwn') {
            setFilters(filter);
        } else {
            filter = {typeOfFeed: 'all', isImage: false};
            setFilters(filter);
        }
        
        console.log(type);

        // Load 10 more items
        // for (var i = 0; i < 10; i++) {
        //     loadNewItems();
        // }

        console.log('refreshed');
    }

    function findMissingProgram(arr1: ProgramData[], arr2: ProgramData[]): ProgramData {
        if (currentItemsState !== undefined || currentItemsState.length != 0) {
            if (arr1.every((i) => i instanceof ProgramData) && arr2.every((i) => i instanceof ProgramData)) {
                for (const item of arr1) {
                    if (!arr2.some((i) => i.id === item.id)) {
                        
                        console.log('added item to current');
                        setCurrentItems(currentItems => [...currentItems, item]);
                        return
                    }
                }
            }
        } else {
            setCurrentItems(currentItems => [...currentItems, itemsState[0]])
            return
        }
    }

    // Get new program from programCollection without deleting the existing ones        <---------------- Must make a better load function
    function loadNewItems() {

        //setCurrentItems(currentItems => [...currentItems, findMissingProgram(itemsState, currentItemsState)]);

        // Check if the item fulfils the requirements from filter
        let filteredItems: ProgramData[] = [];
        if (filterState.typeOfFeed == 'myOwn') {
            for (var item of itemsState) {
                if (item.userID == LocalData.currentUser.id) {
                    filteredItems.push(item);
                }
            }
        } else {
            filteredItems = itemsState;
        }
        
        findMissingProgram(filteredItems, currentItemsState);
        



        //console.log('ho');
        //console.log(currentItemsState);
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
        //         
        //     }
        //}
        
        // If nothing is returned, then tell the user that there are no more feeds
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
            <ScrollView ref={scrollRef} onScroll={({ nativeEvent }) => { if (isCloseToBottom(nativeEvent)) { loadNewItems() } }} scrollEventThrottle={16}>
                <View style={{height: windowHeight}}>
                    <FlatList style={styles.list} data={currentItemsState} numColumns={2} renderItem={({ item }) => (
                        <FeedsListItem name={item.name} text={item.date.toString()} likes={item.likedBy.length}></FeedsListItem>
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