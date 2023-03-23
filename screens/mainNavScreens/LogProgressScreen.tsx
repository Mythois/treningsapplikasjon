import { TouchableOpacity, View, Text, Dimensions, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator, FlatList, TextInput } from "react-native";
import { Button, Image } from '@rneui/themed';
import { LineChart } from "react-native-chart-kit";
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { nanoid } from 'nanoid';
import { LocalData } from '../../LocalData/LocalData';
import { Dropdown } from 'react-native-element-dropdown';

//Define result interface
interface result {
    id: string,
    reps: number,
    weight : number,
    exerciseName: string,
}

interface results {
    resultsID: string,
    userID: string,
    date: Date,
    results: results[]

}
function LogProgressScreen({navigation}) {

    
    //Here's the different exercises the user can choose from in the dropdown-list
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [exercises, setExercises] = useState([
        //TODO Have to replace this example-data with actual data from the user
        {label: 'Squats', value: 'Squats'},
        {label: 'Deadlift', value: 'Deadlift'},
        {label: 'Bench Press', value: 'Bench Press'},
        {label: 'Military Press', value: 'Military Press'},
        {label: 'Barbell Row', value: 'Barbell Row'}
    ]);
    const [selectedValue, setSelectedValue] = useState(null);
    // Method and variable to set and store the current date respectively
    const [currentDate, setCurrentDate] = React.useState('');
    // Finding the current date and setting it
    React.useEffect(() => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      setCurrentDate(
        date + '.' + month + '.' + year 
      );
    }, []);

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

    //Save logged exercises
    //TODO Have to actually save the results
    const saveAlert = () =>
    Alert.alert('Results saved');

    const [results, setResults] = useState<result[]>([]);
    const [reps, setReps] = useState<number>();
    const [weight, setWeight] = useState<number>();

    /**
       * A method that deletes a specific result
       * @param id The id of the result to be deleted
       */
     const handleDeleteExercise = (id: string)  => {
        setResults(prevResults => prevResults.filter(result => result.id !== id));
      }
    // Method for adding more results
    const handleAddExRes = () => {
        const newResult: result = {
          id: nanoid(),
          weight: weight,
          reps: reps,
          exerciseName: selectedValue
        };
        console.log(newResult)
        setResults([...results, newResult]);
        
      };
    
    const handleSaveResults = (results: result[]) => {
        
        
        Alert.alert('Result logged', '', [
            {text: 'Ok', onPress: () => console.log("Ok")},
            ]);
        
    }
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
                        onPress={handleSaveResults} 
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
                    setValue={(value) => { 
                        setValue(value); 
                        setSelectedValue(value); // Update selectedValue here
                      }}
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
            <View style={{justifyContent:'center'}}>
                    <FlatList
                            style={{height:windowHeight-660, flexGrow:0, width:windowWidth}}
                            data = {results}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => 
                            <View style={{width:300, height:70, backgroundColor:"#303030", borderRadius:10, margin:"1%", flexDirection:"row", left:12, padding:5, marginTop:20, marginBottom:10, alignSelf:"center"}}>
                                <View style={{width:"40%"}}>
                                    <TextInput
                                        style = {{fontSize:20, margin:10, color:"#F0DA5D",top:"12%"}}
                                        placeholder='Weight'
                                        placeholderTextColor="#FFFFFF" 
                                        value = {item.weight}
                                        onChangeText={(text) => {
                                            const updateResults = results.map((result) => {
                                            if (result.id === item.id) {
                                                return { ...result, weight: text };
                                            }
                                            return result;
                                            });
                                            setResults(updateResults);
                                        }}
                                    />
                                </View>
                                <View style={{width:"40%"}}>
                                    <TextInput
                                        style = {{fontSize:20, margin:10, color:"#9556CE", top:"12%", marginLeft:"39%"}}
                                        placeholder='Reps'
                                        placeholderTextColor="#FFFFFF"
                                        value = {item.reps}
                                        onChangeText={(text) => {
                                            const updateResults = results.map((result) => {
                                            if (result.id === item.id) {
                                                return { ...result, reps: text };
                                            }
                                            return result;
                                            });
                                            setResults(updateResults);
                                        }}
                                    />
                                </View>
                                <View style={{top:"-1.5%", marginLeft:"13%"}}>
                                <TouchableOpacity onPress={() => handleDeleteExercise(item.id)}>
                                            <Ionicons name="trash" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                                
                            </View>    
                            }

                        />
            </View>
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
                        onPress={handleAddExRes}
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
        paddingTop:450,
        marginBottom:-100
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
        marginBottom: 500,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    container2: {
        flex: 1,
        backgroundColor: '#533483',
        padding: 16,
        justifyContent: 'center',
        alignContent: 'center',
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 13,
        color:"#FFFFFF"
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
  
})

export default LogProgressScreen;

