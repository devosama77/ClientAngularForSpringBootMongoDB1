import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-container-table',
  templateUrl: './student-container-table.component.html',
  styleUrls: ['./student-container-table.component.css']
})
export class StudentContainerTableComponent implements OnInit {
 @Input() public students:any[]=[];
 details:any[]=[];

  constructor(private router:Router) { }

  ngOnInit() {
    this.students.forEach(student=>{
      let details=student.details;
         details.id=student.idStudent;
      this.details.push(details);  
    });

    let i=0;
    this.details.map(d=>{
      i++;
      d.position=i;
    })
 

  }
  displayedColumns: string[] = ['details', 'address', 'phone2', 'phone1', 
  'birthday', 'fatherJob', 'name','position'];
  
   @Input() public isAdmin;
  dataSource = new MatTableDataSource<any[]>(this.details);
// highlight one row
  selectedRowIndex;
  highlight(row) {
    this.selectedRowIndex = row.position;
    // console.log(this.selectedRowIndex)
  }
  onAddNewCourse(){
  }

  onClickAllDetails(element){
    this.router.navigate(["/student-table",element.id])
  //  console.log(element);
  }
}
