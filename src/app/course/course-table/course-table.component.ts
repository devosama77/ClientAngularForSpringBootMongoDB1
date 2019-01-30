import { Component, OnInit } from '@angular/core';
import { CourseTableService } from './course-table.service';


@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {
  regs:any[]=[];
 
  

  constructor(private courseTableService:CourseTableService) { }

  ngOnInit() {
    this.courseTableService.getAllRegistration().subscribe(reg=>{
    this.regs= this.courseTableService.changeFormatAsphasesLevels(reg);
      // console.log(this.regs)
    }
    )
  }

}
