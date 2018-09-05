import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EmployeesService } from "./employees.service";

@Component({
  selector: 'addemployee-form',
  templateUrl: './addemployee-form.component.html'
})
export class AddEmployeeFormComponent {
  locations: string[] = ["Bangalore", "Chennai", "Kochi", "Pune"];

  constructor(private _employeeService: EmployeesService, private router: Router) { }

  onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    let employeeCount = this._employeeService.getEmployeeCount();
    let newEmployee = {
          id: employeeCount + 1,
          name: formValue.name,
          location: formValue.location,
          email: formValue.email,
          mobile: formValue.mobile
        };
    this._employeeService.addEmployee(newEmployee);
    this.router.navigate(['employees']);
  }
}
