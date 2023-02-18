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
        posterName: 'Aaaaaa',
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
];


export default function FeedsContainer() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>
                    This is feeds!
                </Text>
                <FlatList data={Feeds} renderItem={({item}) => (
                    <FeedsListItem name={item.posterName} text={item.feedText} likes={item.likes}></FeedsListItem>
                )}/>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(220, 150, 150)',
        height: 400,
    }
});