import * as React from 'react';
import { View, FlatList, TextInput} from 'react-native';
import { Button, Text } from '@rneui/themed';
import { isTemplateSpan } from 'typescript';
import { AuthErrorCodes } from 'firebase/auth';

interface exercise {
    id: number;
}
export default function ProfileScreen({navigation}) {
    const [exercises, setExercises] = React.useState<exercise[]>([]);
    const handleAddExercise = () => {
        const newExercise: exercise =  {
            id:exercises.length,
        };
        setExercises([...exercises,newExercise])
    }
    return(
        <View style={{backgroundColor: "#121212", flex:1}}>
            <View style={{top:"10%"}}>
                <View>
                    <Text>
                    Workout Program
                    </Text>
                </View>
                
                <View style = {{flexDirection:'row', justifyContent:'center'}}>
                    
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Mon"
                            color = "#25A073"
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Tue"
                            color = "#25A073"
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Wed"
                            color = "#25A073"
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Thu"
                            color = "#25A073"
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Fri"
                            color = "#25A073"
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Sat"
                            color = "#25A073"
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                        />
                    </View>
                    <View style = {{padding:2}}>
                        <Button 
                            title = "Sun"
                            color = "#25A073"
                            buttonStyle={{width:45, height:66, opacity: 87, borderRadius: 25}}
                            titleStyle = {{color:"#FFFFFF", opacity:87, fontSize:12 }}
                            containerStyle ={{}}
                        />
                    </View>
                </View>
                <View style={{justifyContent:'center'}}>
                <FlatList
                        data = {exercises}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => 
                        <View style={{width:335, height:70, backgroundColor:"#303030", borderRadius:10, margin:"1%", flexDirection:"row", justifyContent:"center"}}>
                            <View>
                                <TextInput
                                    style = {{fontSize:30, margin:10}}
                                    placeholder='Exercise'
                                    placeholderTextColor="#FFFFFF"
                                />
                            </View>
                            <View>
                                <TextInput
                                    style = {{fontSize:30, margin:10}}
                                    placeholder='Sets'
                                    placeholderTextColor="#FFFFFF"
                                />
                            </View>
                            <View>
                                <TextInput
                                    style = {{fontSize:30, margin:10}}
                                    placeholder='Reps'
                                    placeholderTextColor="#FFFFFF"
                                />
                            </View>
                            
                        </View>    
                        }

                    />
                    <Button 
                    title= "Add new exercise"
                    color = "#303030"
                    onPress={handleAddExercise}
                    buttonStyle = {{width:200, height:40, borderRadius:10}}
                    />
                    
                </View>
            </View>
        </View>
    );
}