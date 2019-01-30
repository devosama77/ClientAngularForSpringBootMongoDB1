import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { CourseTableComponent } from './course/course-table/course-table.component';
import { StudentTableComponent } from './student/student-table/student-table.component';
import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './student/student-table/student.service';
import { DetailsFinancialComponent } from './student/student-table/dialogs/details-financial/details-financial.component';
import { DetailsCourseComponent } from './student/student-table/dialogs/details-course/details-course.component';
import { AllDetailsComponent } from './student/student-table/all-details/all-details.component';
import { PersonalDetailsComponent } from './student/student-table/all-details/personal-details/personal-details.component';
import { SubjectDetailsComponent } from './student/student-table/all-details/subject-details/subject-details.component';
import { AttendanceDetailsComponent } from './student/student-table/all-details/attendance-details/attendance-details.component';
import { StudentFromsComponent } from './student/student-froms/student-froms.component';
import { DetialsFormComponent } from './student/student-froms/detials-form/detials-form.component';
import { RegisterSubjectComponent } from './student/student-froms/register-subject/register-subject.component';
import { CourseFormComponent } from './course/course-form/course-form.component';
import { ContainerTableComponent } from './course/course-table/container-table/container-table.component';
import { StudentContainerTableComponent } from './student/student-table/student-container-table/student-container-table.component';
import { ShowAttendaceComponent } from './student/student-table/all-details/subject-details/show-attendace/show-attendace.component';
import { FinancialDetailsComponent } from './student/student-table/all-details/financial-details/financial-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    SideNavComponent,
    ToolbarComponent,
    CourseEditComponent,
    CourseTableComponent,
    StudentTableComponent,
    StudentEditComponent,
    PageNotFoundComponent,
    DetailsFinancialComponent,
    DetailsCourseComponent,
    AllDetailsComponent,
    PersonalDetailsComponent,
    SubjectDetailsComponent,
    AttendanceDetailsComponent,
    StudentFromsComponent,
    DetialsFormComponent,
    RegisterSubjectComponent,
    CourseFormComponent,
    ContainerTableComponent,
    StudentContainerTableComponent,
    ShowAttendaceComponent,
    FinancialDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
     ReactiveFormsModule,MatMenuModule,HttpClientModule

  ],
  providers: [StudentService],
  bootstrap: [AppComponent],
  entryComponents:[DetailsFinancialComponent,DetailsCourseComponent]
})
export class AppModule { }
