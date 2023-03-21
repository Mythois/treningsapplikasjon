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

interface group {
    id: string;
    name: number;
    description: string;
    members: string[];
    admins: string[];
}

// The structure of a training program
// interface program{
//     name: string;

//     userID: string;
//     date: Date; // The date at which the training program got created.

//     likedBy: string[];
// }

// The structure of a training program day
// A training program can go over multiple days, this interface represents one day
// interface programDay{
//     weekday: number;
//     exercises: exercise[];   /* The key is an id, the values can be anything, but will be either strings or numbers.
//                                         exercise holds all the exercises associated with that day*/
// }


// ------ Tror ikke jeg trenger denne
// Helper functions
/**
 * A method that groups the exercises, provided in an array, into groups according to the day to which they belong 
 * @param exercisesArray An array consisting of exercise objects
 * @returns An array of arrays, where each subarray contains all exercise objects associated with a given day (for example monday aka day 0)
 */
// export function groupExercisesByDay(exercisesArray:exercise[]){
//     const exercisesByDay: exercise[][] = exercisesArray.reduce((accumulator, exercise) =>{
//         const dayIndex = exercise.day - 1;
//         if (!accumulator[dayIndex]){
//             accumulator[dayIndex] = [];
//         }
//         accumulator[dayIndex].push(exercise);
//         return accumulator;

//     },[]);

//     return(exercisesByDay);
// }


// Antar jeg kanskje trenger denne for å displaye groups senere
/**
 * A method to transform the array of exercises provided as input, into a map. 
 * Map is the format we want to store the exercises of a training program as. 
 * @param exercisesArray An array of exercise objects
 * @returns a map where each key represents the unique id of an exercise and each value is an object with the fields of the exercise, except id.
 */
// export function exercisesArrayToExercisesMap(exercisesArray:exercise[]){
//     if(exercisesArray.length === null){
//         throw new Error();
//     }
//     else{
//         let exercises =  new Map<string,{day: number, name:string, reps:number, sets:number}>();
    
//         exercisesArray.forEach(item => {
//             exercises.set(item.id, {day: item.day, name: item.exerciseName, reps: item.reps, sets: item.sets});
//         });
    
//         return(exercises);
//     }
// }

//Saving
export const saveGroup = async(group:group): Promise<void> =>{
    console.log(LocalData.currentUser.id);
    
    // Saving the group
    const {name, description, members, admins} = group;
    const groupID = uuid();
    const groupRef = doc(db, "groups", groupID);
    const groupData = {name, description, members, admins};
    await setDoc(groupRef, {
        groupData
    })
    .then(async () => {
        const userRef = doc(db, "users", LocalData.currentUser.id);
                LocalData.currentUser.groups.push(groupID);
                await updateDoc(userRef, {
                    'createdGroups':LocalData.currentUser.groups
                }).catch(error => console.log(error.message));
    })
    .catch(error => console.log(error.message)
    );
}





