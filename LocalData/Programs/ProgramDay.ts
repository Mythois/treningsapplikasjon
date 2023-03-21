export class ProgramDayExercise {
  name: string = "";
  reps: string = "";
  sets: string = "";

  constructor(data: any) {
    console.log(data);
    this.name = typeof data.name === "string" ? data.name : "";
    this.reps = typeof data.reps === "string" ? data.reps : "";
    this.sets = typeof data.sets === "string" ? data.sets : "";
    console.log(this.name, this.sets, this.reps);
  }
}