// import { Timestamp } from "firebase/firestore";

export class GroupData {
  id: string = "";
  name: string = "";
  description: string = "";
  members: string[] = [];
  admins: string[] = [];

  constructor(data: any) {
    if (data) {
      this.name = typeof data.name === "string" ? data.name : "";
      this.description = typeof data.description === "string" ? data.description : "";
      // this.date = this.getDateFromTimestamp(data.date) ?? new Date();

      if (Array.isArray(data.members)) {
        this.members = [];
        data.members.forEach((userID: any) => {
            this.members.push(userID)
        })
      }
      if (Array.isArray(data.admins)) {
        this.admins = [];
        data.admins.forEach((userID: any) => {
            this.admins.push(userID)
        })
      }
    }
  }

  // public getDateFromTimestamp(data: any): Date | undefined {
  //   if (data instanceof Date) {
  //     return data;
  //   } else if (data instanceof Timestamp) {
  //     return data.toDate();
  //   } else if (typeof data === "number") {
  //     const date = new Date(data);
  //     if (date.getTime() > 0) {
  //       return date;
  //     }
  //   }
  //   return undefined;
  // }

  public setId(id: string) {
    this.id = typeof id === "string" ? id : "";
  }
}