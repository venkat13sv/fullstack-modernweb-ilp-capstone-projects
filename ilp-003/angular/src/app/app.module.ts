import { appComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { routing }  from './app.routing';
import {IssuesService } from './Issue_main/issues.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { IssueViewer } from './Issue_viewer/view.component';
import { IssueComponent } from './Issue_viewer1/issue_viewer1.component';
import { EditissueFormComponent } from './Edit_issue/editissue.component';
import { AddissueFormComponent } from './Add_Issue/add-issue.component';
import { AboutComponent } from './about/about.component';
import {DatePipe} from '@angular/common';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpClientModule, routing,NgbModule.forRoot() ],
  declarations: [ appComponent,IssueViewer,IssueComponent,EditissueFormComponent,AddissueFormComponent,AboutComponent],
  providers: [ IssuesService,DatePipe ],
  bootstrap: [ appComponent ]
})
export class AppModule { }

