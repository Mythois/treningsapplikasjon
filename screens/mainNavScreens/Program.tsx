import * as React from 'react';
import { View, FlatList, TextInput, ScrollView} from 'react-native';
import { Button, Text } from '@rneui/themed';
import { isTemplateSpan } from 'typescript';
import { AuthErrorCodes } from 'firebase/auth';
import { v4 as uuid } from 'uuid';
import { LocalData } from '../../LocalData/LocalData';
import { exercisesArrayToExercisesMap, groupExercisesByDay, saveProgram} from '../../save/programSave';

interface exercise {
    id: string;
    day: number;
    exerciseName: string;
    sets: number;
    reps: number;
}

// The structure of a training program
interface program{
    name: string;

    userID: string;
    date: Date; // The date at which the training program got created.

    likedBy: string[];
}

// The structure of a training program day
// A training program can go over multiple days, this interface represents one day
interface programDay{
    weekday: number;
    exercises: exercise[];
}


export default function ProgramScreen({navigation}) {
    

    const [currentDate, setCurrentDate] = React.useState('');
  
    React.useEffect(() => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      setCurrentDate(
        date + '.' + month + '.' + year 
      );
    }, []);

    const [exercises, setExercises] = React.useState<exercise[]>([]);
    const [exerciseName, setExerciseName] = React.useState(''); // What about this?
    const [sets, setSets] = React.useState<number>();
    const [reps, setReps] = React.useState<number>();
    const [selectedDay, setSelectedDay] = React.useState<number>(0);
    const [name, setName] = React.useState('');

    const handleAddExercise = () => {
        const newExercise: exercise = {
          id: uuid(),
          day: selectedDay,
          exerciseName: '',
          sets: sets,
          reps: reps,
        };
        setExercises([...exercises, newExercise]);
      };
      const handleDeleteExercise = (id: string)  => {
        setExercises(prevExercises => prevExercises.filter(exercise => exercise.id !== id));
      }
    
    const handleDayPress = (day: number) => {
        setSelectedDay(day);
    }
    const filteredExercises = exercises.filter((exercise) => exercise.day === selectedDay);
    
    const handleSave = (exercises: exercise[]) => {
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
            <View style={{flexDirection:"row", width: "100%", top:"20%", left:"5%"}}>
                <View>
                    <Text style={{color:"#FFFFFF", fontSize:18, top:"20%"}}>
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
            <View style={{top:"10%"}}>
                <View>
                    <TextInput
                    style = {{fontWeight:"bold", fontSize:30, color:"#DC6247", textAlign:"center", paddingBottom:10}}
                    placeholder = "Program Name"
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
                <ScrollView>
                    <FlatList
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
                        
                        <Button 
                        title= "Add new exercise"
                        color = "#303030"
                        style = {{left:"25%", paddingTop:20}}
                        onPress={handleAddExercise}
                        buttonStyle = {{width:200, height:40, borderRadius:10}}
                        />
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}