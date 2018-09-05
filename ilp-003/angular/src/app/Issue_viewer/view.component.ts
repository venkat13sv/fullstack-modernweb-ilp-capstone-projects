import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../Issue_main/issues.service';
import { HttpClientModule } from '@angular/common/http'; 


@Component({
  selector: 'issue-viewer',
  templateUrl: './view.component.html',
  styleUrls: [ './view.component.css' ],
  providers:[IssuesService,HttpClientModule]
})
export class IssueViewer implements OnInit { 
  name = 'Issues Tracker Portal';
  issues: any[];
  issues1:any[]=[];
  issuesTemp:any[];
  private colName: boolean=true;
  private colSeverity: boolean=true;
  private colOpenDate: boolean=true;
  private colStatus: boolean=true;
  private colCloseDate: boolean=true;
  SelectedIDs:any[]=[];
  constructor(private _issueService: IssuesService) { }

  ngOnInit() {
    //this.issues=this._issueService.getIssues();
   this._issueService.getIssues().subscribe(
      (issues:any) =>  this.issues = issues,
      err => console.log(err)
    );
    console.log(this.issues);
    this.issuesTemp=this.issues;
  }

  deleteissue(empid: any) {
    this._issueService.deleteissue(empid);
    this._issueService.getIssues().subscribe(
      (issues:any) =>  this.issues = issues,
      err => console.log(err)
    );
  }
  selectID( id, event:any)
  {
    this.SelectedIDs.push(id);
  }
  deleteissueSelected()
  {
  this.SelectedIDs.forEach(element => {
    this._issueService.deleteissue(element);
    });
    //this.issues=this._issueService.getIssues();
    this._issueService.getIssues().subscribe(
    (issues:any) =>  this.issues = issues,
    err => console.log(err)
  );
  }
  filterItem(searchTerm: any) {
   
    if(searchTerm!="")
    {
    
    for (let issue of this.issuesTemp) {
  
    if(searchTerm==issue.name)
    {
      
      this.issues1.push(issue);
     console.log("test");
     console.log(issue.name);
    }
  }
 

  console.log(this.issues1);
  if(this.issues1!=null)
  {console.log("test1");
  this.issues=null;
  this.issues=this.issues1;
 
  }
}
else
{
  this.issues=this.issuesTemp;
}




  }
}