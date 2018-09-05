import { Injectable} from '@angular/core';
import { Init } from "./initial-employees";

@Injectable()
export class EmployeesService extends Init {
  constructor() {
    super();
    console.log("Initializing Employees service ...");
    this.load();
  }

  getEmployeeCount() {
    let employees = JSON.parse(localStorage.getItem('employees'));
    return employees.length;
  }

  getEmployees() {
    let employees = JSON.parse(localStorage.getItem('employees'));
    return employees;
  }

  getEmployee(id: any) {
    let employees = JSON.parse(localStorage.getItem('employees'));
    let employee:any = null;
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id == id) {
        employee = employees[i];
        break;
      }
    }
    return employee;
  }

  addEmployee(newEmployee: any) {
    let employees = JSON.parse(localStorage.getItem('employees'));
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
  }

  updateEmployee(updatedEmployee: any) {
    let employees = JSON.parse(localStorage.getItem('employees'));
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id == updatedEmployee.id) {
        employees[i] = updatedEmployee;
      }
    }
    localStorage.setItem('employees', JSON.stringify(employees));
  }

  deleteEmployee(id: any) {
    let employees = JSON.parse(localStorage.getItem('employees'));
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id == id) {
        employees.splice(i, 1);
      }
    }
    localStorage.setItem('employees', JSON.stringify(employees));
  }
}
