import Person from "./Person.js";

export default class Student extends Person {
  constructor(name, address, id, email, math, physic, chemistry) {
    super(name, address, id, email);
    this.math = math;
    this.physic = physic;
    this.chemistry = chemistry;
  }
}

