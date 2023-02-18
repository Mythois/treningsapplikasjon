import { useState } from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import FeedsListItem from './FeedsListItem';

// Placeholder for feeds
const Feeds = [
    {
        id: 1,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    },
    {
        id: 2,
        posterName: 'bfdgfgd',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 3,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 4,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 5,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 6,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 7,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    },
    {
        id: 8,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 9,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    },  
    {
        id: 10,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    },
    {
        id: 11,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    },
    {
        id: 12,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 13,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 14,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 15,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 16,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 17,
        posterName: 'CCCCCC',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    },
    {
        id: 18,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 19,
        posterName: 'FFFFFF',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    },  
];

interface Filters {
    typeOfFeed: String,
    isImage: boolean,
}

const defaultFilters: Filters = {typeOfFeed: 'All', isImage: false}


export default function FeedsContainer() {
    
    // Contains the current items
    const [itemsState, setItems] = useState(Feeds);

    // Managing what to load
    const [loadFilters, setFilters] = useState(defaultFilters);

    // Refreshes all items in the item list
    function refresh() {
        alert('refreshed');
    }

    // Loading new items without deleting the existing ones
    function loadNewItems() {
        setItems(currentItems => [...currentItems, Feeds[0]]);
    }

    function isCloseToBottom({contentOffset, contentSize, layoutMeasurement}) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    }

    return (
        <View style={styles.container}>
            <ScrollView onScroll={({nativeEvent}) => {if(isCloseToBottom(nativeEvent)){loadNewItems()}}}>
                <FlatList data={itemsState} renderItem={({item}) => (
                    <FeedsListItem name={item.posterName} text={item.feedText} likes={item.likes}></FeedsListItem>
                )}/>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(220, 150, 150)',
        height: 550,
    }
});