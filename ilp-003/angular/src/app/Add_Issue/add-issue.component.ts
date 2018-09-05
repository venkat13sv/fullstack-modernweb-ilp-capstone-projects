import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IssuesService } from "../Issue_main/issues.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'addissue-form',
  templateUrl: './add-issue.component.html',
  providers:[IssuesService]
})
export class AddissueFormComponent {
 

  constructor(private _issueService: IssuesService,private datePipe: DatePipe, private route: ActivatedRoute, private router: Router) { }
  id: any;
  severity:any="Choose here";
  status:any="Choose here";
  
  

  
  onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    //let employeeCount = this._issueService.getIssuesCount();
    //this.id=employeeCount+1;
    var date = new Date();
   
    let newIssue = {
        id:'0',  // id will be assigned in server 
          name: formValue.name,
          description: formValue.description,
          severity: formValue.severity,
          status:formValue.status,
          created_date : formValue.dp.day+"-"+formValue.dp.month+"-"+formValue.dp.year,
          closed_date:formValue.dp1.day+"-"+formValue.dp1.month+"-"+formValue.dp1.year
        };
    this._issueService.addissue(newIssue).subscribe((err) => {
      if(err) console.log(err);
      console.log("Success"); 
  });
    this.router.navigate(['issues-viewer']);
  }
}
