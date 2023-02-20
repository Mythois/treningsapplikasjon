export class WorkoutUser {
  name: string = "";
  username: string = ""
  id: string = ""

  groups: string[] = [];
  friends: string[] = [];

  /**
   * Takes in the data from firebase to initialize a user instance. 
   */
  constructor(id: string, data: any) {
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
        data.friends.forEach((groupID: any) => {
            this.groups.push(groupID)
        })
    }
  }
  console.log("User:", this.name, this.username, this.groups, this.friends);
  }

  /**
   * Follow this user.
   * @param followBy the id of the user to follow this user.
   */
  followUser(followBy: WorkoutUser) {
    
  }

  /**
   * Unfollow this user.
   * @param unFollowBy the user to unfollow this user.
   */
  unFollowUser(unFollowBy: WorkoutUser) {

  }

}