export class WorkoutUser {
  name: string = "";
  username: string = ""

  groups: string[] = [];
  friends: string[] = [];

  constructor(data: any) {
    if (data) {
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

}