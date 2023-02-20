import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, Dimensions} from 'react-native';
import FeedsListItem from './ProgramsList';

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
        feedText: 'sdfjsd fskdfjsj jkd dksdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 3,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dsdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  kfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 4,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjekdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodsdfjsd f dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkgsdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  hodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 5,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj sdfjsdsdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs   fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 6,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsdsdfjsd fskdfjsjkdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodsdfjsd  jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs   fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
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
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodsdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 9,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fsdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  djgh odjkghodsdfjsd fskdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fighorip hgoidh goui dh',
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
        feedText: 'sdfjsd fskdfjsj jkd dkfjkdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodsdfjsd ef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    },
    {
        id: 12,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkkdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodsdfjsd d dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
        likes: 24,
    }, 
    {
        id: 13,
        posterName: 'Aaaaaa',
        feedText: 'sdfjsd fskdfjsj jkdkdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodsdfjsd  dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
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
        feedText: 'sdfjsd fskdfjsj jkkdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodsdfjsd d dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
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
        feedText: 'sdfjsd fskdfjsj jkdfjsj jkd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodsdfjsd kd dkfjef dsfjeojsdf sjflksd jflk sfkejk fjs fkjs  fdjgh odjkghodfighorip hgoidh goui dh',
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


function FeedsContainer(props,ref) {
    
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
        for (var i=0;i<10;i++){
            loadNewItems();
        }
        alert('refreshed');
    }

    // Fetch new feed from database without deleting the existing ones        <---------------- Must make a better load function
    function loadNewItems() {
        setItems(currentItems => [...currentItems, Feeds[0]]);

        // If nothing is returned, then tell the user that there are no more feeds
    }

    function isCloseToBottom({contentOffset, contentSize, layoutMeasurement}) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000;
    }

    // Allow the parent to call refresh
    useImperativeHandle(ref, () => ({
        refresh: () => { refresh() }
    }));

    return (
        <View style={styles.container}>
            <ScrollView onScroll={({nativeEvent}) => {if(isCloseToBottom(nativeEvent)){loadNewItems()}}}>
                <FlatList style={styles.list} data={itemsState} numColumns={2} renderItem={({item}) => (
                    <FeedsListItem name={item.posterName} text={item.feedText} likes={item.likes}></FeedsListItem>
                )}/>
            </ScrollView>
        </View>
    )
};

export default forwardRef(FeedsContainer);

const windowHeight = Dimensions.get('window').height; // henter høyden på vinduet 
const headerHight = 80; // usikker på om dette er helt riktig men tror det
const menuhight = 20;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(18, 18, 18)',  //bakgrunn fargen
        height: windowHeight - headerHight - menuhight,  // window hight minus top bar minus bunn meny
    },
    list: {
        position: 'relative',
    },
});