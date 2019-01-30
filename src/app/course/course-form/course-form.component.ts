import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseFromService } from './course-from.service';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseGroup: FormGroup;
  options: string[] = ['رياضيات', 'علوم', 'لغة انجليزيه','لغة عربية',
  'تكنولوجيا معلومات','حاسوب','علوم اجتماعية','تفاضل وتكامل'];
  days: any[] = this.getDays();
  levels:any[]=[];
  courseModel:any;
  startDate=new Date();
  minDate:Date;
  maxDate:Date;
  MinHour=0;
  maxHour=24;
  attendanceMessageError="";
  constructor(private fb: FormBuilder,
    private courseFormService:CourseFromService) { }

  get saturday() {
    return this.courseGroup.get('saturday');
  }
  get sunday() {
    return this.courseGroup.get('sunday');
  }
  get monday() {
    return this.courseGroup.get('monday');
  }
  get tuesday() {
    return this.courseGroup.get('tuesday');
  }
  get wednesday() {
    return this.courseGroup.get('wednesday');
  }
  get thursday() {
    return this.courseGroup.get('thursday');
  }
  get friday() {
    return this.courseGroup.get('friday');
  }
   
  get getSubjectName(){
    return this.courseGroup.get("subjectName");
  }

  get getTeacher(){
    return this.courseGroup.get("teacher");
  }
  get getEndCourse(){
    return this.courseGroup.get("startCourse");
  }
  get getStartCourse(){
    return this.courseGroup.get("endCourse");
  }
  get getPhase(){
    return this.courseGroup.get("phase");
  }
  get getLevel(){
    return this.courseGroup.get("level");
  }
  onSubmit() {
  
   const level:number=Number.parseInt(this.courseGroup.value.level) 
   const phase:number=Number.parseInt(this.courseGroup.value.phase) 
   const subjectName=this.courseGroup.value.subjectName;
   const teacher =this.courseGroup.value.teacher;
   const registerDate=new Date();
   const beginDate=this.courseGroup.value.startCourse;
   const endDate=this.courseGroup.value.endCourse;
   const notice=this.courseGroup.value.notice;

      this.courseModel={level,phase,notice,subject: 
        { courseName: subjectName,teacherName:teacher },
         meetings: this.getAttendanceDays(),
         attendanceList:null,
        subjectDetails: {registerDate,beginDate, endDate}
      }
     
       this.courseFormService.addNewCourses(this.courseModel).subscribe(
         res=>{console.log(res)}
       );
      
     
  }

  ngOnInit() {
    let d = new Date();
   let year = d.getFullYear();
   let month = d.getMonth();
   let day = d.getDate();
   this.maxDate = new Date(year + 1, month, day)
   this.minDate=new Date(year,month-4,day);
    this.setCourseGroup();

   this.setValueChanges();

   this.courseGroup.get("level").disable();
   this.courseGroup.get("phase").valueChanges.subscribe(v=>{
    const level=this.courseGroup.get("level");
     if(v==="1"){
      level.enable();
      this.levels=[{n:"1",level:"أول "},{n:"2",level:"ثاني"},{n:"3",level:"ثالث"},
      {n:"4",level:"رابع"},{n:"5",level:"خامس"},{n:"6",level:"سادس"}]
     
     }
     else if(v==="2"){
      level.enable();
      this.levels=[{n:"1",level:"أول"},{n:"2",level:"ثاني"},{n:"3",level:"ثالث"}]
    
     }
    else if(v==="3"){
      level.enable();
      this.levels=[{n:"1",level:"أول"},{n:"2",level:"ثاني"},{n:"3",level:"ثالث"}]
     }
     else{
     level.disable();
     }
     level.updateValueAndValidity();
   })
  }

  getDays():any[]{
  return [
    {
    id: "saturday", name: 'السبت', startH: "satStartH" , endH: "satEndH", showDate: false
    },
    {
      id: "sunday", name: 'الاحد', startH: "sunStartH",  endH: "sunEndH",
      showDate: false
    },
    {
      id: "monday", name: 'الاثنين', startH: "monStartH", endH: "monEndH", 
       showDate: false
    },
    {
      id: "tuesday", name: 'الثلاثاء', startH: "tueStartH", endH: "tueEndH",
      showDate: false
    },
    {
      id: "wednesday", name: 'الاربعاء', startH: "wedStartH",endH: "wedEndH",
       showDate: false
    },
    {
      id: "thursday", name: 'الخميس', startH: "thuStartH",endH: "thuEndH", 
        showDate: false
    },
    {
      id: "friday", name: 'الجمعة', startH: "friStartH",endH: "friEndH", 
        showDate: false
    }
  ]
 }

  setCourseGroup(){
  this.courseGroup = this.fb.group({
    subjectName: ['',[Validators.required, Validators.maxLength(40),Validators.minLength(2)]],
    teacher: ['',[Validators.required, Validators.maxLength(40),Validators.minLength(2)]],
    phase: ['',Validators.required],
    level: ['',Validators.required],
    startCourse: ['',Validators.required],
    endCourse: ['',Validators.required],
    notice:[''],
    saturday: [''], satEndH: [''], satStartH: [''], 
    satEndM: [''], satStartM: [''], 
    sunday: [''], sunEndH: [''],  sunStartH: [''], 
    monday: [''], monEndH: [''],  monStartH: [''], 
    tuesday: [''], tueEndH: [''],  tueStartH: [''], 
    wednesday: [''], wedEndH: [''], wedStartH: [''], 
    thursday: [''], thuEndH: [''],  thuStartH: [''],
    friday: [''], friEndH: [''],  friStartH: [''], 

  });
  }
  setValueChanges(){
  this.saturday.valueChanges.subscribe(v =>
    v ? this.days[0].showDate = true : this.days[0].showDate = false)
  this.sunday.valueChanges.subscribe(v =>
    v ? this.days[1].showDate = true : this.days[1].showDate = false)
  this.monday.valueChanges.subscribe(v =>
    v ? this.days[2].showDate = true : this.days[2].showDate = false)
  this.tuesday.valueChanges.subscribe(v =>
    v ? this.days[3].showDate = true : this.days[3].showDate = false)
  this.wednesday.valueChanges.subscribe(v =>
    v ? this.days[4].showDate = true : this.days[4].showDate = false)
  this.thursday.valueChanges.subscribe(v =>
    v ? this.days[5].showDate = true : this.days[5].showDate = false)
  this.friday.valueChanges.subscribe(v =>
    v ? this.days[6].showDate = true : this.days[6].showDate = false)
  }
  
  getAttendanceDays(){
   let at=[]
    if (this.saturday.value) 
    {
      let d:string=this.courseGroup.value.satStartH;
      let e:string=this.courseGroup.value.satEndH;
      let etime:any[]=e.split(":")
      let stime:any[]=d.split(":");
      at.push({day:"Sat",
     startTimeM:stime[1],endTimeM:etime[1],
     startTimeH:stime[0],endTimeH:etime[0]}
     )
    } 
    if(this.sunday.value)
    {
      let d:string=this.courseGroup.value.sunStartH;
      let e:string=this.courseGroup.value.sunEndH;
      let etime:any[]=e.split(":")
      let stime:any[]=d.split(":");
      at.push({day:"Sun",
     startTimeH:stime[0],endTimeH:etime[0],
     startTimeM:stime[1],endTimeM:etime[1]})}

    if(this.monday.value)
     {
      let d:string=this.courseGroup.value.monStartH;
      let e:string=this.courseGroup.value.monEndH;
      let etime:any[]=e.split(":")
      let stime:any[]=d.split(":");
       at.push({day:"Mon",
       startTimeH:stime[0],endTimeH:etime[0],
       startTimeM:stime[1],endTimeM:etime[1]
    })} 
    if(this.tuesday.value)
    {
      let d:string=this.courseGroup.value.tueStartH;
      let e:string=this.courseGroup.value.tueEndH;
      let etime:any[]=e.split(":")
      let stime:any[]=d.split(":");
      at.push({day:"Tue",
      startTimeH:stime[0],endTimeH:etime[0],
      startTimeM:stime[1],endTimeM:etime[1]
    }) }

     if(this.wednesday.value) 
     {
      let d:string=this.courseGroup.value.wedStartH;
      let e:string=this.courseGroup.value.wedEndH;
      let etime:any[]=e.split(":")
      let stime:any[]=d.split(":");
       at.push({day:"Wed",
       startTimeH:stime[0],endTimeH:etime[0],
       startTimeM:stime[1],endTimeM:etime[1]
    })}
     if(this.thursday.value)
     {
      let d:string=this.courseGroup.value.thuStartH;
      let e:string=this.courseGroup.value.thuEndH;
      let etime:any[]=e.split(":")
      let stime:any[]=d.split(":");
       at.push({day:"Thu",
       startTimeH:stime[0],endTimeH:etime[0],
       startTimeM:stime[1],endTimeM:etime[1]
    }) }
     if(this.friday.value){
      let d:string=this.courseGroup.value.friStartH;
      let e:string=this.courseGroup.value.friEndH;
      let etime:any[]=e.split(":")
      let stime:any[]=d.split(":");
       at.push({day:"Fri",
       startTimeH:stime[0],endTimeH:etime[0],
       startTimeM:stime[1],endTimeM:etime[1]
    }) }
     return at;
  }


  //  Error Validation........
  getErrorSubject(){
    return this.getSubjectName.hasError('required') ? 'ادخل اسم المادة' :
        this.getSubjectName.hasError('maxlength')||
        this.getSubjectName.hasError('minlength') ? 'اسم المادة بين 2 الى 40 حرف' :'';
  }
  getErrorTeacher(){
    return this.getTeacher.hasError('required') ? 'ادخل اسم المدرس كامل' :
    this.getTeacher.hasError('maxlength')||
    this.getTeacher.hasError('minlength') ? 'اسم المدرس بين 2 الى 40 حرف' :'';
  }
  getErrorEndCourse(){
    return this.getTeacher.hasError('required') ? 'ادخل تاريخ نهاية الدورة' :'';
  }
  getErrorStartCourse(){
    return this.getTeacher.hasError('required') ? 'ادخل تاريخ بداية الدورة' :'';
  }
  getErrorPhase(){
    return this.getTeacher.hasError('required') ? ' اختار المرحلة التلعيمية' :'';
  }
  getErrorLevel(){
    return this.getTeacher.hasError('required') ? ' اختار المستوى الدراسي ' :'';
  }

 
}  


