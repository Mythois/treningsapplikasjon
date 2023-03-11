import { View, Text, Dimensions, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from "react-native";
import { Image, Button } from '@rneui/themed';
import { LineChart } from "react-native-chart-kit";
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

function LogProgressScreen({navigation}) {

    //Here's the different exercises the user in the dropdown-list
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [exercises, setExercises] = useState([
        //TODO Have to replace this example-data with actual data from the user
        {label: 'Push-ups', value: 'push-ups'},
        {label: 'Planken', value: 'planken'},
        {label: 'Sit-ups', value: 'sit-ups'},
        {label: 'Burpees', value: 'burpees'},
        {label: 'Utfall', value: 'utfall'}
    ]);

    //Chart-styling
    const chartConfig = {
        backgroundGradientFrom:'#712d24',
        backgroundGradientFromOpacity: 0.1,
        backgroundGradientTo: '#712d24',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(235, 164, 148, ${opacity})`,
        barPercentage: 0.5,
        decimalPlaces: 0,
    };

    //The data that goes into the graph
    //TODO Have to replace this example-data with actual data from the user
    const data = {
        labels: ['10.02', '15.02', '25.02', '03.03', '07.03', '14.03'],
        datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(220, 98, 71, ${opacity})`,
            strokeWidth: 1
        }
        ],
        legend: ['Results']
    };

    const handleAddExercise = () => {
        
    };


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.progHeaderContainer}>
                    <Text style={styles.progHeaderText}> PROGRESS</Text>
                </View>
                <View style={styles.dropdownContainer}>
                    <DropDownPicker
                    open={open}
                    value={value}
                    items={exercises}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setExercises}
                    searchable={true}
                    //TODO Have to change graph and info when a new exercise is selected
                    onChangeValue={(value) => {console.log(value); }}
                    //Only stydling below
                    placeholder="Choose an exercise to log"
                    searchPlaceholder='Try searching after an exercise...'
                    searchTextInputStyle={{
                        fontStyle: 'italic',
                        color: '#e6e6e6',
                    }}
                    style={{
                        backgroundColor: '#303030',
                    }}
                    textStyle={{
                        color: '#e6e6e6',
                        fontSize: 18,
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#303030"
                    }}
                    ArrowDownIconComponent={({style}) => 
                        <Ionicons name='chevron-down-outline' color={'#e6e6e6'} size={25}/>}
                    ArrowUpIconComponent={({style}) => 
                        <Ionicons name='chevron-up-outline' color={'#e6e6e6'} size={25}/>}
                    />
                </View>
                <View style={styles.chartContainer}>
                    <LineChart
                        data={data}
                        width={windowWidth}
                        height={220}
                        chartConfig={chartConfig}
                    />
                </View>
                <View style={styles.logProgHeaderContatiner}>
                    <Text style={styles.logProgHeaderText}> Logged exercises</Text>
                </View>
            </SafeAreaView>
            <ScrollView>

            </ScrollView>
            <SafeAreaView>
                <View style={styles.logExContainer}>
                    <Button 
                        title = 'Log exercise' 
                        buttonStyle = {{
                            justifyContent: 'center', 
                            backgroundColor: '#303030', 
                            alignSelf: 'stretch',
                            width:200, 
                            height:40, 
                            borderRadius:10
                            }}
                        titleStyle = {{
                            fontSize: 18, 
                            fontWeight: 'normal', 
                            color: '#e6e6e6'
                            }}
                        onPress={() => handleAddExercise()}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

const windowHeight = Dimensions.get('window').height; 
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    progHeaderContainer: {
        padding: '1%',
        height: 60,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    progHeaderText: {
        fontSize: 40,
        fontWeight: '900',
        letterSpacing: 2,
        color: '#309A73',
    },
    dropdownContainer: {
        padding: '1%',
        width: windowWidth,
        height: 60,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#121212',
        zIndex: 1,
    },
    chartContainer: {
        padding: '1%',
        width: windowWidth,
        height: 250,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
    logProgHeaderContatiner: {
        padding: '1%',
        height: 60,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    logProgHeaderText: {
        fontSize: 35,
        fontWeight: '900',
        letterSpacing: 2,
        color: '#136A4A',
    },
    logExContainer: {
        padding: '1%',
        height: 60,
        marginBottom: 10,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default LogProgressScreen;

