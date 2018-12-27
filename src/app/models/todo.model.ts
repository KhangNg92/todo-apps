export class Todo {
  // id: number; //timestamp;
  // content: string;
  // isCompleted: boolean;
  // constructor(id: number, content: string) {
  //   this.id = id;
  //   this.content = content;
  //   this.isCompleted = false;
  // }

  constructor (
    public id: number, //dùng timestamp cho id để ko bị trùng
    public content: string,
    public isCompleted: boolean = false
  ) {}
}
