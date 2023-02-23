/**
 * This file contains methods to save training programs as well as helper functions
 * to prepare data for storage.
 */

//Impoorts 
import "firebase/firestore";

import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { LocalData } from "../LocalData/LocalData";




//Interfaces

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
    exercises: Map<number, {day: number, name:string, reps:number, sets:number}>;   /* The key is an id, the values can be anything, but will be either strings or numbers.
                                        exercise holds all the exercises associated with that day*/
    
}



// Helper functions
/**
 * A method that groups the exercises, provided in an array, into groups according to the day to which they belong 
 * @param exercisesArray An array consisting of exercise objects
 * @returns An array of arrays, where each subarray contains all exercise objects associated with a given day (for example monday aka day 0)
 */
export function groupExercisesByDay(exercisesArray:exercise[]){
    const exercisesByDay: exercise[][] = exercisesArray.reduce((accumulator, exercise) =>{
        const dayIndex = exercise.day - 1;
        if (!accumulator[dayIndex]){
            accumulator[dayIndex] = [];
        }
        accumulator[dayIndex].push(exercise);
        return accumulator;

    },[]);

    return(exercisesByDay);
}



/**
 * A method to transform the array of exercises provided as input, into a map. 
 * Map is the format we want to store the exercises of a training program as. 
 * @param exercisesArray An array of exercise objects
 * @returns a map where each key represents the unique id of an exercise and each value is an object with the fields of the exercise, except id.
 */
export function exercisesArrayToExercisesMap(exercisesArray:exercise[]){
    if(exercisesArray.length === null){
        throw new Error();
    }
    else{
        let exercises =  new Map<string,{day: number, name:string, reps:number, sets:number}>();
    
        exercisesArray.forEach(item => {
            exercises.set(item.id, {day: item.day, name: item.exerciseName, reps: item.reps, sets: item.sets});
        });
    
        return(exercises);
    }
}





//Saving
export const saveProgram = async(program:program, programDays: programDay[]): Promise<void> =>{
    console.log(LocalData.currentUser.id);
    
    // Saving the program
    const {name, userID, date, likedBy} = program;
    const programID = uuid();
    const programRef = doc(db, "programs", programID);
    const programData = {name, userID, date, likedBy};
    await setDoc(programRef, {
        programData
    })
    .then(async () => {
        const userRef = doc(db, "users", LocalData.currentUser.id);
                LocalData.currentUser.createdPrograms.push(programID);
                await updateDoc(userRef, {
                    'createdPrograms':LocalData.currentUser.createdPrograms
                }).catch(error => console.log(error.message));
        for (let i = 0; i < programDays.length; i++){
            const {weekday, exercises} = programDays[i];
            const programDayRef = doc(db, 'programs/${programID}/programDays', uuid());
            const programDayData = {weekday, exercises};
            await setDoc(programDayRef, {programDayData})
            .catch(error => console.log(error.message));
        }
    })
    .catch(error => console.log(error.message)
    );

    // Saving programDays
    
}





