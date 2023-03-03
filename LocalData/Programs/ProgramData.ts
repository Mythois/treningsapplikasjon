export class ProgramData {
    name: string = "";
    userID: string = "";
    date: Date = new Date();
    likedBy: string[] = [];
  
    constructor(data: any) {
      if (data) {
        this.name = typeof data.name === "string" ? data.name : "";
        this.userID = typeof data.userID === "string" ? data.userID : "";
        this.date = typeof data.date === "function" ? data.date : new Date();
  
        if (Array.isArray(data.likedBy)) {
          this.likedBy = [];
          data.likedBy.forEach((userID: any) => {
              this.likedBy.push(userID)
          })
      }
    }
  }
}