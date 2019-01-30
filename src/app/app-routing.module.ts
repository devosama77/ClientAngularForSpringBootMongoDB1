import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { CourseTableComponent } from './course/course-table/course-table.component';

import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { StudentTableComponent } from './student/student-table/student-table.component';
import { AllDetailsComponent } from './student/student-table/all-details/all-details.component';
import { StudentFromsComponent } from './student/student-froms/student-froms.component';
import { CourseFormComponent } from './course/course-form/course-form.component';


const routes: Routes = [
  {path:"",component:WelcomeComponent ,pathMatch:"full"},
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"course-table",component:CourseTableComponent},
  {path:"course-edit",component:CourseEditComponent},
  {path:"course-form",component:CourseFormComponent},
  {path:"student-table",component:StudentTableComponent},
  {path:"student-edit",component:StudentEditComponent},
  {path:"student-table/:id",component:AllDetailsComponent,
// children:[
//   {path:"attendance", component:ShowAttendaceComponent}
// ]
},
  {path:"add-student-form",component:StudentFromsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
