import { async } from '@firebase/util';
import { Component, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { LocalData } from '../../../LocalData/LocalData';
import { GroupData } from '../../../LocalData/Groups/GroupData';
import GroupsListItem from './GroupsListItem';
import { useFocusEffect } from '@react-navigation/native';


// Default filters has the type of 'all'

let currentUserID: string = '';
let currentUserGroups: string[] = [];

// This is container for the whole feed section
// It contain functions to filter the feeds, get new feeds from loaded groups
function GroupsContainer(props, ref) {

    // This ref is used to refer to the scrollview so that we know when the user scrolled to the bottom to generate new feed
    const scrollRef: any = useRef();

    // Contains the current items
    const groups: GroupData[] = [];
    const memberGroups: string[] = [];
    const [itemsState, setItems] = useState(groups); // Hva er forskjellen på denne og currentItems
    const [groupmemberState, setGroupmember] = useState(memberGroups);
    const [currentItemsState, setCurrentItems] = useState(groups); 


    /**
    * Refreshes all items in the item list.
    */
    function refresh() {

        // Scroll back to top when a new tab is pressed
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });

        // Reloads the feeds from the database

        LocalData.groupCollecter.load(() => {
            setItems(LocalData.groupCollecter.getGroups()); // <------------------------ Put everything here
            currentUserID = LocalData.currentUser.id;
            setGroupmember(LocalData.currentUser.groups);
            setCurrentItems(LocalData.groupCollecter.getGroups()); // Hvorfor skjer dette to ganger?
            console.log(currentItemsState);
        });

        // Refreshes the items by setting itemsState to be empty
        setCurrentItems([]);

        console.log('refreshed');
    }

    function findOneMissingGroup(arr1: GroupData[], arr2: GroupData[]): GroupData {
        if (currentItemsState !== undefined || currentItemsState.length != 0) {
            if (arr1.every((i) => i instanceof GroupData) && arr2.every((i) => i instanceof GroupData)) {
                for (const item of arr1) {
                    if (!arr2.some((i) => i.id === item.id)) {

                        console.log('added unique item to current');
                        setCurrentItems(currentItems => [...currentItems, item]); // Hvorfor klager den?!?!?!
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

    function resultMyGroupsFilter() {
        let filteredItems: GroupData[] = [];
        for (var gmID of groupmemberState) {
            for (var group of itemsState) {
                if (gmID == group.id) {
                    filteredItems.push(group);
                    console.log('Added group to my groups');
                }
            }
        }
        return filteredItems;
    }

    // function loadTenInitialItemsFromFilteredItems() {
    //     console.log('starts to load inital items');
    //     let items: GroupData[] = [];
    //     for (let i = 0; i < 11; i++) {
    //         console.log(items.length);
    //         for (const item of filteredItemsState) {
                
    //             if (!items.some((i) => i.id === item.id)) {

                    
    //                 items.push(item);
    //                 i = i + 1;
    //             }
    //         }
            
    //     }
    //     return items;
    // }

    // Unused function
    // Get new program from programCollection without deleting the existing ones
    function loadNewItems() {
        setCurrentItems(currentItems => [...currentItems, findOneMissingGroup(itemsState, currentItemsState)]);
    }


    function isCloseToBottom({ contentOffset, contentSize, layoutMeasurement }) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 2000;
    }

    // Allow the parent to call refresh
    useImperativeHandle(ref, () => ({
        refresh: () => { refresh() }
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
                    <FlatList style={styles.list} data={resultMyGroupsFilter()} numColumns={1} renderItem={({ item }) => (
                        <GroupsListItem name={item.name} description={item.description}></GroupsListItem>
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
        backgroundColor: '#121212',
        height: windowHeight - 80 - 20,
    },
    list: {
        position: 'relative',
    },
});