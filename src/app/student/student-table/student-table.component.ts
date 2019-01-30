import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from './student.service';


@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  public phases: any[] = [];

  @Input() isAdmin;
  constructor(private studentService: StudentService) {

  }

  ngOnInit() {
    this.isAdmin = this.isAdmin ? this.isAdmin : false;
    this.studentService.getAllStudents().subscribe(students => {
     this.phases= this.studentService.changeFormatAsphasesLevels(students);
    // console.log(this.phases)
    })

  }
 




}
