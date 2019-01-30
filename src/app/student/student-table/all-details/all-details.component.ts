import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-all-details',
  templateUrl: './all-details.component.html',
  styleUrls: ['./all-details.component.css']
})
export class AllDetailsComponent implements OnInit {
  displayedColumns: string[] = ['payments', 'fees', 'position'];
  dataSource = ELEMENT_DATA;
  response;
  students;
  public details: any = {};
  public subjects: any[] = []
  id;
  title:string=" الدورات المسجلة ";
  constructor(private activatedRoute: ActivatedRoute,
    private studentService: StudentService) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      let id = paramMap.get('id');
      this.id = id;

    })
    this.studentService.getStudent(this.id).subscribe(res => {
      this.response = res;
      this.students = this.response.students
        this.students.forEach(stu => {
         stu.registerStudents.forEach(reg => {
           this.subjects=reg.registerSubjectForStudents;
         
         });
        });
    })

  }

  // To show title 
  onSendTitle(title:string){
    this.title=title;
  }
  
}
