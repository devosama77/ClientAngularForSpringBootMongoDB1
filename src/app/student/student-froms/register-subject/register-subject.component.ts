import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, ThemePalette } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CourseTableService } from 'src/app/course/course-table/course-table.service';
import { StudentFormsService } from '../detials-form/student-forms.service';


export interface SubjectModel{
  row:any,
  subject:string,
}

@Component({
  selector: 'app-register-subject',
  templateUrl: './register-subject.component.html',
  styleUrls: ['./register-subject.component.css']
})
export class RegisterSubjectComponent implements OnInit {

  constructor(private courseTableService:CourseTableService,private fb:FormBuilder,
    private studentFormsService:StudentFormsService){}

  selectedSubjects:SubjectModel[]=[];
  filterSubject:any[]=[];
  courseGroup:FormGroup;

   @Input() public data;
  coursesData:any[]=[];
  dataSource;
  ngOnInit() {
  
    // get all the subjects from Serve to show in table
    this.courseTableService.getAllRegistration().subscribe(sub=>{
     let phase=Number.parseInt(this.data.phase);
     let level=Number.parseInt(this.data.level);

      this.filterSubject=this.courseTableService.filterRegByPhaseLevel(phase,level,sub);

      this.filterSubject.forEach(s=>{this.coursesData.push(
        {subject:s.subject,subjectDetails:s.subjectDetails,meetings:s.meetings,id:s.id}
      )})
      // console.log(this.coursesData)
      this.dataSource=new MatTableDataSource<any>(this.coursesData);
    });
    
    // Add Form Group and controls
     this.courseGroup=this.fb.group({
       fees:[''],
       pay:['']
     })
  }
  displayedColumns: string[] = ['dateEnd','dateStart','dateRegister',
  'teacher','subject','position', 'select'];
  
  selection = new SelectionModel<any>(true, []);
 

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
   
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
   if( this.isAllSelected()){
    this.selection.clear();
    this.selectedSubjects=[];
   }else{
    this.selectedSubjects=[];
    this.dataSource.data.forEach(row => {
      this.selectedSubjects.push({subject:row.subject.courseName,row:row})
      return this.selection.select(row)});
   }  
     
  }
   

  // for every row is selected or not selected  
  onToggle(row){
    this.selection.toggle(row);
    
    if(this.selection.isSelected(row)){
      this.selectedSubjects=[...this.selectedSubjects,{subject:row.subject.courseName,row:row}]
    }else
    {
    this.selectedSubjects= this.selectedSubjects.filter(r=>r.subject!==row.subject.courseName)
    }    
  }

  onSubmit(){
    let registerSubjectForStudents=[];
    this.selectedSubjects.forEach(s=>{
      registerSubjectForStudents=[...registerSubjectForStudents,
       { subject:s.row.subject,
        subjectDetails:s.row.subjectDetails,
        meetings:s.row.meetings}
       ]
      // console.log("registerSubjectForStudents "+registerSubjectForStudents)
    })

    let register={
      details:this.data.details,
      registerStudents:[{
             // Register Financial object
             registerFinancial:{
              fees:this.courseGroup.value.fees,
              feesDate:new Date(),
              payments:[
                {
                  payments:this.courseGroup.value.pay,
                  datePayments:new Date(),
                  timePayments:new Date().getTime,
                  notice:""
                }  
              ],
              notice:""
            },
            registerSubjectForStudents:registerSubjectForStudents,
            notice:""
      }]
    }
   //  console.log("register "+register);
  this.studentFormsService.addNewStudent(register).subscribe(s=>{
   console.log(s);
  })

   

    
  }// end onSubmit
  
} // end of class




