export class ProgramDayExercise {
  name: string = "";
  reps: string = "";
  sets: string = "";

  constructor(data: any) {
    this.name = typeof data.name === "string" ? data.name : "";
    this.reps = typeof data.reps === "string" ? data.reps : "";
    this.sets = typeof data.sets === "string" ? data.sets : "";
  }
}