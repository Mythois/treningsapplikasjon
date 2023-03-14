import { View, Text, Dimensions, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Button, Image } from '@rneui/themed';
import { LineChart } from "react-native-chart-kit";
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

function LogProgressScreen({navigation}) {

    //Here's the different exercises the user can choose from in the dropdown-list
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

    //Chart configuration and styling
    const chartStyle = {
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
    const chartData = {
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

    //Adds a new result box where the user can log their result
    const handleAddExRes = () => {
        //TODO Have to add a "result-boxs"
    };

    //Save logged exercises
    //TODO Have to actually save the results
    const saveAlert = () =>
    Alert.alert('Results saved');


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.topRowContainer}>
                    {/*Logo */}
                    <Image
                        source={require("../../assets/images/WeTrainLogo.png")}
                        containerStyle={styles.logoBox}
                        style={{width: '50%', height: '70%'}}
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator />} 
                        onPress={() => navigation.navigate('Home')}>
                    </Image>
                    {/* Save button */}
                    <Button 
                        color={'#121212'} 
                        title={'Save'} 
                        style={styles.saveText} 
                        onPress={saveAlert} 
                    />
                </View>
                <View style={styles.progHeaderContainer}>
                    <Text style={styles.progHeaderText}> PROGRESS</Text>
                </View>
                <View style={styles.dropdownContainer}>
                    <DropDownPicker
                    //The drop-down list where you can choose an exercise to log/see your progress
                    open={open}
                    value={value}
                    items={exercises}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setExercises}
                    searchable={true}
                    //TODO Have to change graph and info when a new exercise is selected
                    onChangeValue={(value) => {console.log(value); }}
                    //Only styling below
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
                        //The chart that visually shows exercise progress
                        data={chartData}
                        width={windowWidth}
                        height={220}
                        chartConfig={chartStyle}
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
                        //Button to log a new exercise result
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
                        onPress={() => handleAddExRes()}
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
    topRowContainer: {
        padding: '1%',
        height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logoBox: {
        marginLeft: 5,
        width: '70%',
    },
    saveText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#e6e6e6',
        marginRight: '1%',
    },
    progHeaderContainer: {
        padding: '1%',
        height: 55,
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

