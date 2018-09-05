import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { IssuesService } from "../Issue_main/issues.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'editissue-form',
  templateUrl: './editissue.component.html',
  providers:[IssuesService]
})
export class EditissueFormComponent {
 

  constructor(private _issueService: IssuesService, private route: ActivatedRoute, private router: Router) { }
  id: any;
  issue: any;
  dp:any;
  dp1:any;
 



  ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
          this.id = +params['id'];
      });
      this._issueService.getIssue(this.id).subscribe(
        (issue:any) =>  this.issue = issue,
        err => console.log(err)
      );;
       let crdate=this.issue.created_date.split("-");
        this.dp1={day:parseInt(crdate[0]),month:parseInt(crdate[1]),year:parseInt(crdate[2])};
      if(this.issue.closed_date!=""||this.issue.closed_date!="-")
      {
        let cdate=this.issue.closed_date.split("-");
        this.dp={day:parseInt(cdate[0]),month:parseInt(cdate[1]),year:parseInt(cdate[2])};
      }
      
      console.log(this.issue);
  }

  onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    let updatedissue = {
        id: this.issue.id,
          name: formValue.name,
          description: formValue.description,
          severity: formValue.severity,
          status:formValue.status,
          created_date: this.issue.created_date,
          
          closed_date:formValue.dp.day+"-"+formValue.dp.month+"-"+formValue.dp.year
        };
        /*if(updatedissue.closed_date!="undefined-undefined-undefined" && updatedissue.closed_date!="")
          updatedissue.status="Closed";
        else
          updatedissue.status="Pending";*/

    this._issueService.updateissue(updatedissue);
    this.router.navigate(['issues-viewer']);
  }
}
