import EmployeeInterface from "./employee.interface";

export default class EmployeeClass implements EmployeeInterface{
  id: number;
  name: string;
  operation: string;
  designation: string;


  constructor(id: number, name: string, operation: string, designation: string) {
    this.id = id;
    this.name = name;
    this.operation = operation;
    this.designation = designation;
  }
}
