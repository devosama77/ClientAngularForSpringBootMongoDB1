import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
@Output() toggleSidenav=new EventEmitter<void>();
  constructor(private router:Router) { }
  isSubjectActive=false;
  isStudentActive=false;
   isCourseActive=false;
  ngOnInit() {
  }

  onToggleSideNav(){
    this.toggleSidenav.emit();
  }

  onSubjectTable(){
     this.router.navigate(["/subject-table"]);
      this.isStudentActive=false;
      this.isCourseActive=false;
      this.isSubjectActive=true;
  }

  onSubjectEdit(){
    this.router.navigate(["/subject-edit"]);
    this.isStudentActive=false;
    this.isCourseActive=false;
    this.isSubjectActive=true;
  }
  onStudentTable(){
    this.router.navigate(["/student-table"]);
    this.isStudentActive=true;
    this.isCourseActive=false;
    this.isSubjectActive=false;
  }
  onStudentTableAdmin(){
    this.router.navigate(["/student-edit"]);
    this.isStudentActive=true;
    this.isCourseActive=false;
    this.isSubjectActive=false;
  }

  onCourseTable(){
    this.router.navigate(["/course-table"]);
    this.isStudentActive=false;
    this.isCourseActive=true;
    this.isSubjectActive=false;
  }
  onCourseEdit(){
    this.router.navigate(["/course-form"]);
    this.isStudentActive=false;
    this.isCourseActive=true;
    this.isSubjectActive=false;
  }

  onAddStudent(){
    this.router.navigate(["/add-student-form"])
    this.isStudentActive=true;
    this.isCourseActive=false;
    this.isSubjectActive=false;
  }
}
