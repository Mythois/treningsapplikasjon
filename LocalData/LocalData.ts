import { WorkoutUser } from "./Users/WorkoutUser";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import UsersCollectionLoader from "./Users/UserCollectionLoader";
import { ProgramData } from "./Programs/ProgramData";
import ProgramCollectionLoader from "./Programs/ProgramCollectionLoader";

export class LocalData {
  /**
   * The WorkoutUser instance of the user currently signed in to the application
   */
  static currentUser: WorkoutUser = new WorkoutUser({});
  
  /**
   * CollectionLoaders to load the instances of users and programs in the app.
   */
  static usersCollection: UsersCollectionLoader = new UsersCollectionLoader();

  static programCollection: ProgramCollectionLoader = new ProgramCollectionLoader();
    
  static async initCurrentUser() {
    console.log("Init curr user");
    
    const cu = auth.currentUser;
    if (cu) {
      const userRef = doc(db, "users", cu.uid);
      await getDoc(userRef)
      .then((snap) => {
        console.log(snap.data());
        this.currentUser = new WorkoutUser(snap.data(), cu.uid);
      })
      .catch(error => console.log(error.message));
    }
  }
}