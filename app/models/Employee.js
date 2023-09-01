import Person from "./Person.js";

export default class Employee extends Person {
  constructor(name, address, id, email, working_days, daily_wages) {
    super(name, address, id, email);
    this.working_days = working_days;
    this.daily_wages = daily_wages;
  }
}

