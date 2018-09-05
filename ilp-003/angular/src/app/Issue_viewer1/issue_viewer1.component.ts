import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { IssuesService } from "../Issue_main/issues.service";



@Component({
    templateUrl: './issue_viewer1.component.html',
    styleUrls: ['./issue_viewer1.component.css'],
    providers:[ IssuesService ]
})
export class IssueComponent implements OnInit {
    id: any;
    issue: any;
    
    constructor(private _issueService: IssuesService, private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.id = +params['id'];
        });
        this.issue = this._issueService.getIssue(this.id);
    }

    goBack(): void {
        this.location.back();
    }
}
