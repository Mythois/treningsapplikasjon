export class ProgramData {
  id: string = "";
  name: string = "";
  userID: string = "";
  date: Date = new Date();
  likedBy: string[] = [];

  constructor(data: any) {
    if (data) {
      this.name = typeof data.name === "string" ? data.name : "";
      this.userID = typeof data.userID === "string" ? data.userID : "";
      this.date = typeof data.date.getMonth === 'function' ? data.date : new Date();  // <----------- Fix, the fetch data.date is not a Date

      if (Array.isArray(data.likedBy)) {
        this.likedBy = [];
        data.likedBy.forEach((userID: any) => {
            this.likedBy.push(userID)
        })
      }
    }
  }

  public setId(id: string) {
    this.id = typeof id === "string" ? id : "";
  }
}