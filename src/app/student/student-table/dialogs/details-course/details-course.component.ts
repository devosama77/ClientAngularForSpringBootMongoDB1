import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { StudentMdoel } from 'src/app/student/student.model';
import { CoursesModel } from './courses.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.component.html',
  styleUrls: ['./details-course.component.css']
})
export class DetailsCourseComponent implements OnInit {
  course = new CoursesModel();
  courses: CoursesModel[] = [];
  registerationData;
  name;
  i = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public passData: any) {
    this.registerationData = passData.courses;
    this.name = passData.name;
  }

  private getData() {
    return this.registerationData;
  }
  getName() {
    return this.name;
  }

  ngOnInit() {
  this.setStateData();

  }

  // function to bring data and put initialize Array
  private setStateData() {
    this.registerationData.forEach(element => {
      if (element !== null || Array.isArray(element) || element !== undefined) {
        element.forEach(e => {
          this.course = new CoursesModel;
          this.course.color = this.getColor();
          this.course.subject = e.subject.courseName;
          this.course.teacher = e.subject.teacherName;
          this.course.endDate = e.subjectDetails.endDate;
          this.course.notice = e.notice;
          //         Attendance and absendt
          if (e.attendanceList !== null || Array.isArray(e.attendanceList)
            || e.attendanceList !== undefined) {
            let i = 0;
            let y = 0;
            e.attendanceList.forEach(att => {
              if (att.status === true) {
                ++i;
              } else {
                ++y;
              }

            })
            e.timeAtt = i;
            e.timeAbs = y;

            this.course.att = i;
            this.course.abs = y;
          }
          this.courses.push(this.course)
        });
      }
    });
  }

  getColor() {
    this.i += 1;
    if (this.i % 2 == 0) {
      return "lightblue"
    }
    else {
      return "lightgray"
    }
  }

}
