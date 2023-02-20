import { WorkoutUser } from "./Users/WorkoutUser";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import UsersCollectionLoader from "./Users/UserCollectionLoader";

export class LocalData {
  /**
   * The WorkoutUser instance of the user currently signed in to the application
   */
  static currentUser: WorkoutUser = new WorkoutUser({});
  
  /**
   * A CollectionLoader to load the instances of users in the app.
   */
  static usersCollection: UsersCollectionLoader = new UsersCollectionLoader();
    
  static async initCurrentUser() {
    console.log("Init curr user");
    
    const cu = auth.currentUser;
    if (cu) {
      const userRef = doc(db, "users", cu.uid);
      await getDoc(userRef)
      .then((snap) => {
        console.log(snap.data());
        this.currentUser = new WorkoutUser(snap.data());
      })
      .catch(error => console.log(error.message));
    }
  }
}