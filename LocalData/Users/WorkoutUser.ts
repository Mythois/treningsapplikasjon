import { deleteField, doc, updateDoc } from "firebase/firestore";
import * as React from "react";
import { auth, db } from "../../firebase";
import { LocalData } from "../LocalData";

export class WorkoutUser {
  name: string = "";
  username: string = ""
  id: string = ""

  groups: string[] = [];
  friends: string[] = [];
  createdPrograms: string[] = [];

  /**
   * Takes in the data from firebase to initialize a user instance. 
   */
  constructor(data: any, id?: string) {
    if (data) {
      this.id = id
      this.name = typeof data.name === "string" ? data.name : "";
      this.username = typeof data.username === "string" ? data.username : "";

    if (Array.isArray(data.groups)) {
      this.groups = [];
      data.groups.forEach((groupID: any) => {
          this.groups.push(groupID)
      })
    }
    if (Array.isArray(data.friends)) {
        this.friends = [];
        data.friends.forEach((userID: any) => {
            this.friends.push(userID)
        })
    }
    if (Array.isArray(data.createdPrograms)) {
      this.createdPrograms = []
      data.createdPrograms.forEach((programID: any) => {
        this.createdPrograms.push(programID)
      });
    }
  }
  console.log("User:", this.name, this.username, this.groups, this.friends, this.createdPrograms);
  }

  /**
   * Follow this user.
   * @param followBy the id of the user to follow this user.
   */
  followUser(completion: () => void) {
    if (!LocalData.currentUser.friends) {
      LocalData.currentUser.friends = []
    }
    if (LocalData.currentUser.friends.includes(this.id) === true) return
    LocalData.currentUser.friends.push(this.id)
    this.saveFollows(completion)
  }

  /**
   * Unfollow this user.
   * @param unFollowBy the user to unfollow this user.
   */
  unFollowUser(completion: () => void) {
    if (!LocalData.currentUser.friends) {
      LocalData.currentUser.friends = []
    }
    const idx = LocalData.currentUser.friends.indexOf(this.id)
    if (idx < 0) return
    LocalData.currentUser.friends.splice(idx, 1)
    this.saveFollows(completion)
  }

  async saveFollows(completion: () => void) {
    const docRef = doc(db, "users", auth.currentUser.uid)
      await updateDoc(docRef, {
        "friends": LocalData.currentUser.friends.length > 0 ? 
        LocalData.currentUser.friends : deleteField()
      })
      .then(() => completion())
      .catch(error => console.log(error.message))
  }

  isFollowingUser(): boolean {
    return LocalData.currentUser.friends.includes(this.id) === true
  }

}