import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { WorkoutUser } from "./WorkoutUser";


/**
 * UsersCollectionLoader helper class for working with collections in firebase.
 */
export default class UsersCollectionLoader {
    // Attributes
    collectionRef = collection(db, "users");
    
    loaded: boolean = false;
    
    private users: WorkoutUser[] = [];
    /**
     * Get users method. Make sure document is loaded before using.
     * @returns the users in the collection.
     */
    public getUsers(): WorkoutUser[] {
        return this.users;
    }

    // load, loaded
    /**
     * Loads the collection
     * @param completion 
     */
    async load(completion: (documents: WorkoutUser[]) => void) {
        if (this.loaded) { return; }
        // Creating a loading query
        const q = query(this.collectionRef);
        const querySnapshot = await getDocs(q)
        .then((docs) => {
            docs.forEach((doc) => {
                const u = new WorkoutUser(doc.data());
                if (u.username != "") this.users.push(u);
            })
            completion(this.users);
        })
        .catch(error => console.log(error.message))
        .finally(() => {
            if (this.users.length > 0) this.loaded = true;
            console.log("Loaded users:", this.users);
        });
    }

    /**
     * Search for users by their username
     */
    public searchUsers(search: string): WorkoutUser[] {
        const returnUsers: WorkoutUser[] = []
        this.users.forEach(user => {
            if (user.username.includes(search)) 
                returnUsers.push(user);
        })
        return returnUsers;
    }
}