import { Injectable} from '@angular/core';
import { Init } from "./initial-issues";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs';


@Injectable()
export class IssuesService extends Init {
  private _issuesUrl = "http://localhost:3000/issues";
  private addIssues="http://localhost:3000/issues/add";
  private updateIssues="http://localhost:3000/issues/update/";
  private editIssues="http://localhost:3000/issues/edit/";
  
  constructor(private _http: HttpClient) {
    super();
    console.log("Initializing Issue Tracker service ...");
    this.load();
  }

  getIssuesCount() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    return issues.length;
  }

  getIssues() {
    //let issues = JSON.parse(localStorage.getItem('issues'));
    //return issues;
    return this._http.get(this._issuesUrl);
  }

  getIssue(id: any) {
    /*let issues = JSON.parse(localStorage.getItem('issues'));
    let issue:any = null;
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issue = issues[i];
        break;
      }
    }
    return issue;*/
    this.editIssues+=id;
    return this._http.get(this.editIssues);

  }

  addissue(newissue: any) {
    //let issues = JSON.parse(localStorage.getItem('issues'));
    //issues.push(newissue);
    //localStorage.setItem('issues', JSON.stringify(issues));
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.addIssues, JSON.stringify(newissue),{headers:headers});
  }

  updateissue(updatedissue: any) {
  
   /*let issues = JSON.parse(localStorage.getItem('issues'));
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == updatedissue.id) {
        issues[i] = updatedissue;
      }
    }*/
    this.updateIssues+=updatedissue.id;
  //  localStorage.setItem('issues', JSON.stringify(issues));
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.put(this.updateIssues,JSON.stringify(updatedissue),{headers:headers});
  }

  deleteissue(id: any) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
  }
}