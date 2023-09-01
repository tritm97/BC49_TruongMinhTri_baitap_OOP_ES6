import Person from "./Person.js";

export default class Customer extends Person {
  constructor(name, address, id, email, company_name, cost, rating) {
    super(name, address, id, email);
    this.company_name = company_name;
    this.cost = cost;
    this.rating = rating;
  }
}

