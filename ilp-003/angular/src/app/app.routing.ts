import { Routes, RouterModule } from '@angular/router';

import {appComponent} from './app.component';
import { IssueViewer } from './Issue_viewer/view.component';
import { AddissueFormComponent } from './Add_Issue/add-issue.component';

import { IssueComponent } from './Issue_viewer1/issue_viewer1.component';
import { AboutComponent } from './about/about.component';
import{ EditissueFormComponent } from './Edit_issue/editissue.component';


const appRoutes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'issues-viewer', component: IssueViewer },
  { path: 'issues-viewer/:id', component: IssueComponent },
  { path: 'addIssue', component:  AddissueFormComponent},
  {path:'editissue/:id',component:EditissueFormComponent}
 
];

export const routing = RouterModule.forRoot(appRoutes);