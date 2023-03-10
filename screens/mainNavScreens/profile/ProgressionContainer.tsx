import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Image } from '@rneui/themed';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert} from 'react-native';
import { LocalData } from '../../../LocalData/LocalData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WorkoutUser } from '../../../LocalData/Users/WorkoutUser';
import { BarChart, LineChart } from "react-native-chart-kit";
import { color } from '@rneui/base';

function ProgressionContainer({user, ref} : {user : WorkoutUser, ref : any}) {
    
    // Contains the current items
    const [itemsState, setItems] = useState([]);
    useEffect(() => {
        //refresh();
    }, []);

    const handleLogProgressPress = () => {
        
    }

    const handleBackPress = () => {
        
    }

    const handleForwardPress = () => {
        
    }

    const chartConfig = {
        backgroundGradientFrom: "#1a0b27",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#29123e",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(207, 179, 233, ${opacity})`,
        barPercentage: 0.7,
        decimalPlaces: 0,
    };

    const data = {
        labels: ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
        {
            data: [10, 5, 0, 7, 5, 6, 0]
        }
        ],
    };

    // Managing what to load
    // const [loadFilters, setFilters] = useState(defaultFilters);

    // Refreshes all items in the item list --> trenger ikke å kunne refreshe headeren

    return (
        <View style={styles.progressionColumnContainer}>
            <View style={styles.progressHeaderContatiner}>
                    <Text adjustsFontSizeToFit={true} style={styles.progressHeaderText}> PROGRESS </Text>
            </View>
            <View style={styles.progressionRowContainer}>
                <View style={styles.chartTitleContainer}>
                    <Text adjustsFontSizeToFit={true} style={styles.chartTitle}> Times exercised week 8</Text>
                </View>
                <View style={styles.backContainer}>
                    <Ionicons name='caret-back-outline' color={'#cfb3e9'} size={30} onPress={handleBackPress}></Ionicons>
                </View>
                <View style={styles.forwardContainer}>
                    <Ionicons name='caret-forward-outline' color={'#cfb3e9'} size={30} onPress={handleBackPress}></Ionicons>
                </View>
            </View>
            <View>
                <BarChart
                    data={data}
                    width={windowWidth}
                    height={180}
                    yAxisLabel=''
                    yAxisSuffix=''
                    chartConfig={chartConfig}
                />
            </View>
            <View style={styles.logProgContainer}>
                <Button title = 'Log Progress' 
                    buttonStyle = {{justifyContent: 'center', backgroundColor: '#136A4A', alignSelf: 'stretch',
                        borderRadius: 8}}
                    titleStyle = {{fontSize: 18, fontWeight: 'normal', color: '#e6e6e6',}}
                    onPress={() => handleLogProgressPress()}
                />
            </View>
        </View>
    )
};

export default forwardRef(ProgressionContainer);


const windowHeight = Dimensions.get('window').height; 
const windowWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    list: { //? Blir denne brukt? Skal vi fjerne den?
        position: 'relative',
    },
    progressionColumnContainer: {
        padding: '1%',
        height: 315,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    progressHeaderContatiner: {
        padding: '1%',
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    progressHeaderText: {
        fontSize: 37,
        fontWeight: '900',
        letterSpacing: 2,
        color: '#DC6247',
    },
    progressionRowContainer: {
        marginTop: '1%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    backContainer: {
        padding: '1%',
        height: 35,
    },
    forwardContainer: {
        padding: '1%',
        height: 35,
    },
    chartTitleContainer: {
        marginTop: 3,
        height: 35,
        justifyContent: "center",
        alignSelf: "center",
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#cfb3e9',
    },
    logProgContainer: {
        padding: '1%',
        height: 50,
        alignSelf: "flex-end",
    },
});