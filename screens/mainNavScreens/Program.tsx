/**
 * About this file:
 * 
 * This file represents the Program tab of the application.
 * Here the user can create programs by defining a program name and
 * by adding exercises to the various days of the week. 
 * 
 * An exercise has a name, a numer of sets and  a number of repetitions.
 * A day of the week is called a programDay and can have multiple exercises.
 * The programDay is selected by pressing the respective button for that day.
 * A program has a name/title and a date (which is automatically stored with the 
 * rest of the necessary information when the user pressen save).
 * Furthermore, a program consists of programDays.
 */


// Imports
import * as React from 'react';
import { View, FlatList, TextInput, ScrollView, Alert, ActivityIndicator, Dimensions, SafeAreaView} from 'react-native';
import { Button, Text , Image} from '@rneui/themed';
import { isTemplateSpan } from 'typescript';
import { AuthErrorCodes } from 'firebase/auth';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid'
import { LocalData } from '../../LocalData/LocalData';
import { exercisesArrayToExercisesMap, groupExercisesByDay, saveProgram} from '../../save/programSave';
import SmallHeaderContent from './profile/SmallHeaderContent';

interface exercise {
    id: string;
    day: number;
    exerciseName: string;
    sets: number;
    reps: number;
}

interface program{
    name: string;

    userID: string;
    date: Date; // The date at which the training program is created

    likedBy: string[];
}

interface programDay{
    weekday: number;
    exercises: exercise[];
}



// Phone dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProgramScreen({navigation}) {
        // Find current date 

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

    const childRef: any = React.useRef();

    const [exercises, setExercises] = React.useState<exercise[]>([]);
    const [exerciseName, setExerciseName] = React.useState(''); // What about this?
    const [sets, setSets] = React.useState<number>();
    const [reps, setReps] = React.useState<number>();
    const [selectedDay, setSelectedDay] = React.useState<number>(0);
    const [name, setName] = React.useState('');

    /**
     * A method to add new exercises to the list of exercises
     */
    const handleAddExercise = () => {
        const newExercise: exercise = {
          id: nanoid(),
          day: selectedDay,
          exerciseName: '',
          sets: sets,
          reps: reps,
        };
        setExercises([...exercises, newExercise]);
      };
      

      /**
       * A method that deletes a specific exercise
       * @param id The id of the exercise to be deleted
       */
      const handleDeleteExercise = (id: string)  => {
        setExercises(prevExercises => prevExercises.filter(exercise => exercise.id !== id));
      }

    
    /**
     * This method is responsible for registering the day the user presses
     * @param day The day the user has pressed
     */
    const handleDayPress = (day: number) => {
        setSelectedDay(day);
    }

    /**
     * The set of exercises that pertain to the day the user selects
     */
    const filteredExercises = exercises.filter((exercise) => exercise.day === selectedDay);
    



    /**
     * Method for saving training programs
     * @param exercises an array of exercise objects
     */
    const handleSave = (exercises: exercise[]) => {
        if(name == ""){
            Alert.alert('Please enter a program name', '', [
                {text: 'Proceed', onPress: () => console.log("No program created")},
              ]);
        }
        else{
            Alert.alert('Program Created', '', [
                {text: 'Ok', onPress: () => console.log("Ok")},
              ]);
            const newProgram = {name: name,
            userID: LocalData.currentUser.id,
            date: new Date(),
            likedBy:["test"]};
            const programDays: programDay[] = [];

            for (let index = 0; index < 7; index++) {
            const filteredExcs = exercises.filter((exercise) => exercise.day === index)
            if (filteredExcs.length > 0) {
                const newExercisesArray: exercise[] = [];
                filteredExcs.forEach(exerciseItem => newExercisesArray.push(exerciseItem))

                const newProgramDay: programDay = {
                    weekday: index,
                    exercises: newExercisesArray
                }
                programDays.push(newProgramDay)
            }
            }
            saveProgram(newProgram, programDays)

            setName("");    
            setExercises([]);
            setSelectedDay(0);
            setExerciseName("");
            setSets(undefined);
            setReps(undefined);
        }
        
    }
    /*
    const handleSave = (exercises:exercise[]) =>{
        const newProgram = {name: "test",
    /*const handleSave = (exercises:exercise[]) =>{
        const newProgram = {name: name,
                         userID: LocalData.currentUser.id,
                        date: new Date(),
                        likedBy:["test"]};

        const groupedExercises = groupExercisesByDay(exercises);
        let programDays =  [];

        groupedExercises.forEach(item =>{
            const newProgramDayExercises = exercisesArrayToExercisesMap(item);
            const newProgramDayWeekday = newProgramDayExercises[0].day;
            const newProgramDay: programDay = {
                weekday: newProgramDayWeekday,
                exercises: newProgramDayExercises,
            }
            programDays.push(newProgramDay);
        });

        saveProgram(newProgram,programDays)
        
    }*/

    return(
        <View style={{backgroundColor: "#121212", flex:1}}>
            <SafeAreaView>
            <SmallHeaderContent user={LocalData.currentUser} ref={childRef} navigation={navigation}></SmallHeaderContent>
            </SafeAreaView>
            <View style={{flexDirection:"row", width: "100%", top:"0%", left:"5%"}}>
                <View>
                    <Text style={{color:"#FFFFFF", fontSize:18, top:"25%"}}>
                        {currentDate}
                    </Text>
                </View>
                <View style={{left:"450%"}}>
                    <Button
                        
                        color = "#121212"
                        titleStyle={{fontSize:18}}
                        title="Save"
                        onPress={() =>handleSave(exercises)}
                    />
                </View>
            </View>
            <View style={{top:"0%"}}>
                <View style={{paddingTop:10}}>
                    <TextInput
                    style = {{fontWeight:"bold", fontSize:30, color:"#DC6247", textAlign:"center", paddingBottom:5}}
                    placeholder = "Program Name"
                    value={name}
                    placeholderTextColor = "#DC6247"
                    onChangeText={(text) => setName(text)}
                    />
                </View>
                
                <View style = {{flexDirection:'row', justifyContent:'center'}}>
                    
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Mon"
                            color = {selectedDay === 0 ? "#136A4A" : "#309A73"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(0)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Tue"
                            color = {selectedDay === 1 ? "#136A4A" : "#309A73"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(1)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Wed"
                            color = {selectedDay === 2 ? "#136A4A" : "#309A73"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:11 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(2)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Thu"
                            color = {selectedDay === 3 ? "#136A4A" : "#309A73"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(3)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Fri"
                            color = {selectedDay === 4 ? "#136A4A" : "#309A73"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(4)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Sat"
                            color = {selectedDay === 5 ? "#136A4A" : "#309A73"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(5)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Sun"
                            color = {selectedDay === 6 ? "#136A4A" : "#309A73"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(6)}
                        />
                    </View>
                </View>
                <View style={{justifyContent:'center'}}>
                    <FlatList
                            style={{height:windowHeight*0.54}}
                            data = {filteredExercises}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => 
                            <View style={{width:335, height:70, backgroundColor:"#303030", borderRadius:10, margin:"1%", flexDirection:"row", left:12, padding:5, marginTop:20, marginBottom:10}}>
                                <View style={{width:"40%"}}>
                                    <TextInput
                                        style = {{fontSize:20, margin:10, color:"#FFFFFF", top:"12%"}}
                                        placeholder='Exercise'
                                        placeholderTextColor="#FFFFFF"
                                        value = {item.exerciseName}
                                        onChangeText={(text) => {
                                            const updatedExercises = exercises.map((exercise) => {
                                            if (exercise.id === item.id) {
                                                return { ...exercise, exerciseName: text };
                                            }
                                            return exercise;
                                            });
                                            setExercises(updatedExercises);
                                        }}
                                    />
                                </View>
                                <View style={{width:"24%"}}>
                                    <TextInput
                                        style = {{fontSize:20, margin:10, color:"#F0DA5D",top:"12%"}}
                                        placeholder='Sets'
                                        placeholderTextColor="#FFFFFF" 
                                        value = {item.sets}
                                        onChangeText={(text) => {
                                            const updatedExercises = exercises.map((exercise) => {
                                            if (exercise.id === item.id) {
                                                return { ...exercise, sets: text };
                                            }
                                            return exercise;
                                            });
                                            setExercises(updatedExercises);
                                        }}
                                    />
                                </View>
                                <View style={{width:"28%"}}>
                                    <TextInput
                                        style = {{fontSize:20, margin:10, color:"#9556CE", top:"12%"}}
                                        placeholder='Reps'
                                        placeholderTextColor="#FFFFFF"
                                        value = {item.reps}
                                        onChangeText={(text) => {
                                            const updatedExercises = exercises.map((exercise) => {
                                            if (exercise.id === item.id) {
                                                return { ...exercise, reps: text };
                                            }
                                            return exercise;
                                            });
                                            setExercises(updatedExercises);
                                        }}
                                    />
                                </View>
                                <View style={{top:"-1.5%", left:"9%"}}>
                                    <Button
                                        
                                        buttonStyle={{borderRadius:10}}
                                        color = "#E93333"
                                        titleStyle= {{fontSize:8, color:"#000000"}}
                                        title={"X"}
                                        onPress={() => handleDeleteExercise(item.id)}
                                    />
                                </View>
                                
                            </View>    
                            }

                        />
                    <View style={{alignItems: 'center', marginTop:"0%"}}>
                        <Button 
                        title= "Add new exercise"
                        color = "#303030"
                        onPress={handleAddExercise}
                        buttonStyle = {{width:200, height:40, borderRadius:10}}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}