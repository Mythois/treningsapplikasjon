import { WorkoutUser } from "./Users/WorkoutUser";
import { auth, db } from "../firebase";
import { doc, getDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import UsersCollectionLoader from "./Users/UserCollectionLoader";
import ProgramCollectionLoader from "./Programs/ProgramCollectionLoader";
import GroupCollectionLoader from "./Groups/GroupCollectionLoader";

export class LocalData {
  /**
   * The WorkoutUser instance of the user currently signed in to the application
   */
  static currentUser: WorkoutUser = new WorkoutUser({});
  
  /**
   * CollectionLoaders to load the instances of users, programs and groups in the app.
   */
  static usersCollection: UsersCollectionLoader = new UsersCollectionLoader();

  static programCollection: ProgramCollectionLoader = new ProgramCollectionLoader();
  static groupCollecter: GroupCollectionLoader = new GroupCollectionLoader();

  static unsubscribeListener: Unsubscribe;
    
  static async initCurrentUser() {
    console.log("Init curr user");
    
    const cu = auth.currentUser;
    if (cu) {
      const userRef = doc(db, "users", cu.uid);
      await getDoc(userRef)
      .then((snap) => {
        console.log(snap.data());
        this.currentUser = new WorkoutUser(snap.data(), cu.uid);
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