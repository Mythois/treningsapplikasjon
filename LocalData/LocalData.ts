import { WorkoutUser } from "./Users/WorkoutUser";
import { auth, db } from "../firebase";
import { doc, getDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
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
  static unsubscribeListener: Unsubscribe;
    
  static async initCurrentUser() {
    console.log("Init curr user");
    
    const cu = auth.currentUser;
    if (cu) {
      const userRef = doc(db, "users", cu.uid);
      await getDoc(userRef)
      .then((snap) => {
        console.log(snap.data());
        this.currentUser = new WorkoutUser(snap.data(), auth.currentUser.uid);
        this.setupCurrentUserListener()
      })
      .catch(error => console.log(error.message));
    }
  }
  static setupCurrentUserListener() {
    LocalData.unsubscribeListener();
    LocalData.unsubscribeListener = onSnapshot(doc(db, "users", auth.currentUser.uid), {
      next: (snap) => {
        console.log("Reinit currentuser")
        this.currentUser = new WorkoutUser(snap.data(), auth.currentUser.uid);
      },
      error: error => console.log(error.message),
    })
  }
}