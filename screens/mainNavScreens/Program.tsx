import * as React from 'react';
import { View, FlatList, TextInput} from 'react-native';
import { Button, Text } from '@rneui/themed';
import { isTemplateSpan } from 'typescript';
import { AuthErrorCodes } from 'firebase/auth';

interface exercise {
    id: number;
    day: number;
    exerciseName: string;
    sets: number;
    reps: number;
}
export default function ProgramScreen({navigation}) {
    const [exercises, setExercises] = React.useState<exercise[]>([]);
    const [exerciseName, setExerciseName] = React.useState('');
    const [sets, setSets] = React.useState<number>();
    const [reps, setReps] = React.useState<number>();
    const [selectedDay, setSelectedDay] = React.useState<number>(0);
    const handleAddExercise = () => {
        const newExercise: exercise = {
          id: exercises.length,
          day: selectedDay,
          exerciseName: '',
          sets: sets,
          reps: reps,
        };
        setExercises([...exercises, newExercise]);
      };
    
    const handleDayPress = (day: number) => {
        setSelectedDay(day);
    }
    const filteredExercises = exercises.filter((exercise) => exercise.day === selectedDay);
    
    return(
        <View style={{backgroundColor: "#121212", flex:1}}>
            <View style={{width:"16%", height:"5%", left:"74%", top:"8%"}}>
                <Button
                    title="Save"
                />
            </View>
            <View style={{top:"10%"}}>
                <View>
                    <Text style = {{fontWeight:"400", fontSize:30, color:"#DC6247", textAlign:"center", paddingBottom:10}}>
                    Workout   Program
                    </Text>
                </View>
                
                <View style = {{flexDirection:'row', justifyContent:'center'}}>
                    
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Mon"
                            color = {selectedDay === 0 ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(0)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Tue"
                            color = {selectedDay === 1 ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(1)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Wed"
                            color = {selectedDay === 2 ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(2)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Thu"
                            color = {selectedDay === 3 ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(3)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Fri"
                            color = {selectedDay === 4 ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(4)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Sat"
                            color = {selectedDay === 5 ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(5)}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Sun"
                            color = {selectedDay === 6 ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress(6)}
                        />
                    </View>
                </View>
                <View style={{justifyContent:'center'}}>
                <FlatList
                        data = {filteredExercises}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => 
                        <View style={{width:335, height:70, backgroundColor:"#303030", borderRadius:10, margin:"1%", flexDirection:"row", left:12, padding:5, marginTop:10}}>
                            <View>
                                <TextInput
                                    style = {{fontSize:30, margin:10, color:"#FFFFFF"}}
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
                            <View>
                                <TextInput
                                    style = {{fontSize:30, margin:10, color:"#9556CE"}}
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
                            <View>
                                <TextInput
                                    style = {{fontSize:30, margin:10, color:"#F0DA5D"}}
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
                    
                </View>
            </View>
        </View>
    );
}