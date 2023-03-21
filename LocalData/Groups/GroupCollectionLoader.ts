import { collection, getDocs, query, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { GroupData } from "./GroupData";


/**
 * UsersCollectionLoader helper class for working with collections in firebase.
 */
export default class GroupCollectionLoader {
    // Attributes
    collectionRef = collection(db, "groups");
    
    loaded: boolean = false;                      //   <---------------------- Not sure if we need this
    
    private groups: GroupData[] = [];
    /**
     * Get users method. Make sure document is loaded before using.
     * @returns the users in the collection.
     */
    public getGroups(): GroupData[] {
        return this.groups;
    }

    // load, loaded
    /**
     * Loads the collection
     * @param completion 
     */
    async load(completion: (documents: GroupData[]) => void) {
        if (this.loaded) { return; }              // <---------------------- Not sure if we need this
        this.groups = [];
        // Creating a loading query
        const q = query(this.collectionRef);
        const querySnapshot = await getDocs(q)
        .then((docs) => {
            docs.forEach((doc) => {
                const g = new GroupData(doc.data().groupData);
                g.setId(doc.id);
                this.groups.push(g);
            })
            
            completion(this.groups);
        })
        .catch(error => console.log(error.message))
        .finally(() => {
            if (this.groups.length > 0) this.loaded = true;
            console.log("Loaded groups:", this.groups);
        });
    }
}