import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EmployeesService } from "./employees.service";

@Component({
  selector: 'editemployee-form',
  templateUrl: './editemployee-form.component.html'
})
export class EditEmployeeFormComponent {
  locations: string[] = ["Bangalore", "Chennai", "Kochi", "Pune"];

  constructor(private _employeeService: EmployeesService, private route: ActivatedRoute, private router: Router) { }
  id: any;
  employee: any;

  ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
          this.id = +params['id'];
      });
      this.employee = this._employeeService.getEmployee(this.id);
  }

  onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    let updatedEmployee = {
          id: this.employee.id,
          name: formValue.name,
          location: formValue.location,
          email: formValue.email,
          mobile: formValue.mobile
        };
    this._employeeService.updateEmployee(updatedEmployee);
    this.router.navigate(['employees']);
  }
}
