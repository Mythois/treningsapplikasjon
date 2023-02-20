import * as React from 'react';
import { View, FlatList, TextInput} from 'react-native';
import { Button, Text } from '@rneui/themed';
import { isTemplateSpan } from 'typescript';
import { AuthErrorCodes } from 'firebase/auth';

interface exercise {
    id: number;
    day: string;
    exerciseName: string;
    sets: string;
    reps: string;
}
export default function ProgramScreen({navigation}) {
    const [exercises, setExercises] = React.useState<exercise[]>([]);
    const [exerciseName, setExerciseName] = React.useState('');
    const [sets, setSets] = React.useState('');
    const [reps, setReps] = React.useState('');
    const [selectedDay, setSelectedDay] = React.useState<string>("Mon");
    const handleAddExercise = () => {
        const newExercise: exercise = {
          id: exercises.length,
          day: selectedDay,
          exerciseName: '',
          sets: '',
          reps: '',
        };
        setExercises([...exercises, newExercise]);
      };
    
    const handleDayPress = (day: string) => {
        setSelectedDay(day);
    }
    const filteredExercises = exercises.filter((exercise) => exercise.day === selectedDay);
    
    return(
        <View style={{backgroundColor: "#121212", flex:1}}>
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
                            color = {selectedDay === "Mon" ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress("Mon")}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Tue"
                            color = {selectedDay === "Tue" ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress("Tue")}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Wed"
                            color = {selectedDay === "Wed" ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress("Wed")}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Thu"
                            color = {selectedDay === "Thu" ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress("Thu")}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Fri"
                            color = {selectedDay === "Fri" ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress("Fri")}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Sat"
                            color = {selectedDay === "Sat" ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress("Sat")}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Sun"
                            color = {selectedDay === "Sun" ? "#25A073" : "#CCCCCC"}
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                            onPress={() => handleDayPress("Sun")}
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