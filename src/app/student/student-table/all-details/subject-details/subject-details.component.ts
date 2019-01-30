import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { StudentService } from '../../student.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { StudentTableAllDetialsService } from '../student-table-all-detials.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit,OnDestroy {
  id;
  response;
  students:any[]=[]
  dataSource;
  displayedColumns;
   regSubjects:any[]=[];
   subjects:any[]=[];
   subjectsDetails:any={};
   showAttendance:any=false;
   title;
   showAttendaceSubscribtion:Subscription;
   @Output() sendTitle=new EventEmitter<string>();

  constructor(private studentService:StudentService,private router:Router
    ,private ativatedRoute:ActivatedRoute
    ,private activatedRoute:ActivatedRoute,
    private studentTalbleAllDetailsService:StudentTableAllDetialsService) { }
   
  ngOnInit() {
     // on change show Attendace
     this.studentTalbleAllDetailsService.onHideShowAttendace();
     this.showAttendaceSubscribtion= this.studentTalbleAllDetailsService.changeShowAttendance.subscribe(
       s=>{
        this.showAttendance=s.isShow;
        this.title=s.title;
        this.sendTitle.emit(this.title);
       }
     )
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      let id = paramMap.get('id');
   //   console.log(paramMap)
      this.id = id;
    })
    this.studentService.getStudent(this.id).subscribe(res => {
      
      this.response = res;
      this.students = this.response.students
        this.students.forEach(stu => {
         stu.registerStudents.forEach(reg => {
          reg.registerSubjectForStudents.forEach(sub=>{
            
            this.regSubjects.push(sub);
            let i=1;
            this.regSubjects.map(reg=>{
              reg.position=i++});
              this.dataSource = new MatTableDataSource<any>(this.regSubjects);
          })
           
         });
        });
    })
    this.displayedColumns=['show','notice','endDate','beginDate','registerDate'
    ,'teacher','subject','position'];
  

  } // end ngOnInit

  onShowAttendance(){
    this.studentTalbleAllDetailsService.onChangeShowAttendance();
    // this.router.navigate(['attendance'],{relativeTo:this.activatedRoute,});
  }

  ngOnDestroy(){
    this.showAttendaceSubscribtion.unsubscribe();
  }

}
