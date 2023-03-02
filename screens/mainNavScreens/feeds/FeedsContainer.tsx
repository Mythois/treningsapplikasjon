import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { LocalData } from '../../../LocalData/LocalData';
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

// Contains the basic shape of programs
interface Program {
    id: String,
    name: string,
    userID: string,
    date: Date,
    likedBy: string[],
}

// Temporary mock items for feeds
function GenerateFeed() {
    function GerenerateRandomNumberOfStringsInAnArray() {
        let array = [];
        for (var i = 0; i < Math.floor(Math.random() * 100); i++) {
            array.push('a');
        };
        return array;
    }
    function GenerateRandomExerciseText() {
        let text: String = "";
        text = text + "Monday: " + Math.floor(Math.random() * 8) + 1 + " sets" + Math.floor(Math.random() * 8) + 1 + " reps" + "\n";
        text = text + "Tuesday: " + Math.floor(Math.random() * 8) + 1 + " sets" + Math.floor(Math.random() * 8) + 1 + " reps" + "\n";
        text = text + "Wednesday: " + Math.floor(Math.random() * 8) + 1 + " sets" + Math.floor(Math.random() * 8) + 1 + " reps" + "\n";
        text = text + "Thursday: " + Math.floor(Math.random() * 8) + 1 + " sets" + Math.floor(Math.random() * 8) + 1 + " reps" + "\n";
        text = text + "Friday: " + Math.floor(Math.random() * 8) + 1 + " sets" + Math.floor(Math.random() * 8) + 1 + " reps" + "\n";
        text = text + "Saturday: " + Math.floor(Math.random() * 8) + 1 + " sets" + Math.floor(Math.random() * 8) + 1 + " reps" + "\n";
        text = text + "Sunday: " + Math.floor(Math.random() * 8) + 1 + " sets" + Math.floor(Math.random() * 8) + 1 + " reps" + "\n";
        return text;
    }
    function GenerateRandomExerciseName() {
        let text: String = "";
        text = text + "Program" + Math.floor(Math.random() * 89) + 10;
        return text;
    }
    const feed = {
        id: Math.random(),
        userID: 'you',
        name: GenerateRandomExerciseName(),
        date: new Date(),
        likedBy: GerenerateRandomNumberOfStringsInAnArray(),
        text: GenerateRandomExerciseText(),
    };
    return feed;
}

interface Filters {
    typeOfFeed: String,
    isImage: boolean,
}

const defaultFilters: Filters = { typeOfFeed: 'All', isImage: false }


function FeedsContainer(props, ref) {

    const scrollRef: any = useRef();
    // Contains the current items
    const [itemsState, setItems] = useState([]);
    useEffect(() => {
        refresh();
        // LocalData.programCollection.load(() => {
        //     setItems(LocalData.programCollection.getPrograms())
        // });
    }, []);

    // Managing what to load                                               <---------------------- this is made for later functions
    const [loadFilters, setFilters] = useState(defaultFilters);

    // Refreshes all items in the item list
    function refresh() {
        console.log('refreshed');
        console.log(itemsState);
        console.log(LocalData.programCollection.getPrograms());
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
        LocalData.programCollection.load(() => {
            setItems(LocalData.programCollection.getPrograms())
        });
        //setItems([]);
        for (var i = 0; i < 10; i++) {
            loadNewItems();
        }
    }

    // Fetch new feed from database without deleting the existing ones        <---------------- Must make a better load function
    function loadNewItems() {
        //setItems(currentItems => [...currentItems, GenerateFeed()]);

        // If nothing is returned, then tell the user that there are no more feeds
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
            <ScrollView ref={scrollRef} onScroll={({ nativeEvent }) => { if (isCloseToBottom(nativeEvent)) { loadNewItems() } }} scrollEventThrottle={16}>
                <FlatList style={styles.list} data={itemsState} numColumns={2} renderItem={({ item }) => (
                    <FeedsListItem name={item.name} text={item.text} likes={item.likedBy.length}></FeedsListItem>
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