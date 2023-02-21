import { collection, getDocs, query, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { LocalData } from "../LocalData";
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
        this.users = [];
        // Creating a loading query
        const q = query(this.collectionRef);
        const querySnapshot = await getDocs(q)
        .then((docs) => {
            this.users.push(LocalData.currentUser);
            docs.forEach((doc) => {
                const u = new WorkoutUser(doc.data());
                if (u.username != "" &&
                u.username != LocalData.currentUser.username) 
                    this.users.push(u);
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
     * Search for users by their username. This method is to be used in search functions by input.
     * @param s the search keyword
     * @returns an array of the matching users.
     */
    public searchUsers(s: string): WorkoutUser[] {
        const returnUsers: WorkoutUser[] = []
        const search = s.toLowerCase();
        if (search.length < 2) { return returnUsers; }
        this.users.forEach(user => {
            const un = user.username.toLowerCase();
            const name = user.name.toLowerCase();
            if (un.includes(search) || name.includes(search)) 
                returnUsers.push(user);
        })
        return returnUsers;
    }
}