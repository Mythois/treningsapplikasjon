import { Timestamp } from "firebase/firestore";
import { ProgramDayExercise } from "./ProgramDay";

export class ProgramData {
  id: string = "";
  name: string = "";
  userID: string = "";
  date: Date = new Date();
  likedBy: string[] = [];

  exercisesData: any = {name: "", reps: "", sets: "",};
  programDaysExercise: ProgramDayExercise = new ProgramDayExercise(this.exercisesData);

  constructor(data: any) {
    if (data) {
      this.name = typeof data.name === "string" ? data.name : "";
      this.userID = typeof data.userID === "string" ? data.userID : "";
      this.date = this.getDateFromTimestamp(data.date) ?? new Date();
      this.programDaysExercise = data.exercises ? new ProgramDayExercise(data.exercises) : this.exercisesData;

      if (Array.isArray(data.likedBy)) {
        this.likedBy = [];
        data.likedBy.forEach((userID: any) => {
            this.likedBy.push(userID)
        })
      }
    }
  }

  public getDateFromTimestamp(data: any): Date | undefined {
    if (data instanceof Date) {
      return data;
    } else if (data instanceof Timestamp) {
      return data.toDate();
    } else if (typeof data === "number") {
      const date = new Date(data);
      if (date.getTime() > 0) {
        return date;
      }
    }
    return undefined;
  }

  public setId(id: string) {
    this.id = typeof id === "string" ? id : "";
  }
}