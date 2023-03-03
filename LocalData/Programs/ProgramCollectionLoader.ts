import { collection, getDocs, query, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { LocalData } from "../LocalData";
import { ProgramData } from "./ProgramData";


/**
 * UsersCollectionLoader helper class for working with collections in firebase.
 */
export default class ProgramCollectionLoader {
    // Attributes
    collectionRef = collection(db, "programs");
    
    loaded: boolean = false;
    
    private programs: ProgramData[] = [];
    /**
     * Get users method. Make sure document is loaded before using.
     * @returns the users in the collection.
     */
    public getPrograms(): ProgramData[] {
        return this.programs;
    }

    // load, loaded
    /**
     * Loads the collection
     * @param completion 
     */
    async load(completion: (documents: ProgramData[]) => void) {
        //if (this.loaded) { return; }
        this.programs = [];
        // Creating a loading query
        const q = query(this.collectionRef);
        const querySnapshot = await getDocs(q)
        .then((docs) => {
            this.programs.push(LocalData.currentPrograms);
            docs.forEach((doc) => {
                const p = new ProgramData(doc.data().programData);
                this.programs.push(p);
            })
            completion(this.programs);
        })
        .catch(error => console.log(error.message))
        .finally(() => {
            if (this.programs.length > 0) this.loaded = true;
            console.log("Loaded programs:", this.programs);
        });
    }
}