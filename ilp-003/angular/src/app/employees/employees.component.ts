import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "./employees.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[];

  constructor(private _employeeService: EmployeesService) { }

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    console.log(this.employees);
  }

  deleteEmployee(empid: any) {
    this._employeeService.deleteEmployee(empid);
    this.employees = this._employeeService.getEmployees();
  }
}
