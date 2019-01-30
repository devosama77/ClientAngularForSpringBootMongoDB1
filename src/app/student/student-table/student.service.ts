import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { StudentMdoel } from "../student.model";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";


@Injectable()
export class StudentService{
    
    url_students:string="http://localhost:8080/students/all";
    url_student:string="http://localhost:8080/students/student";
    
    constructor(private http:HttpClient){
    }
// get Daata from the Server 
     // get All Student 
    getAllStudents():Observable<StudentMdoel[]>{
        return this.http.get<StudentMdoel[]>(this.url_students).pipe(
            catchError(this.handleError)
        )  
    }
    getStudent(id):Observable<any[]>{
      return this.http.get<any[]>(this.url_student+"/"+id).pipe(
        catchError(this.handleError)
      )
    }
// change data after subscribe
    getStudentWithPhaseLevel(phase:number,level:number,stu){
        let studentsFilter=[...stu];
        let studentsArray;
           this.getTable(phase,level,studentsFilter);
           studentsArray=[...this.getTable(phase,level,studentsFilter)];  
           return studentsArray;     
    }
    getTable(phase,level,subjectArray){
        return subjectArray.filter(s=>s.details.phase===phase&&s.details.level===level?s.details.phase===phase&&s.details.level===level:false);
        
      }
    //  Change format the data (Student)
    changeFormatAsphasesLevels(stu){
        let phases: any[] = [];
        for (let i = 1; i <= 3; i++) {
          let phase;
          if (i === 1) {
            phase = 1;
            let levels: any[] = [];
            // number all studens
            let number:number=0; 
            for (let j = 1; j <= 6; j++) {
              let levelName;
              if (j === 1) { levelName = "أولى" }
              if (j === 2) { levelName = "ثاني" }
              if (j === 3) { levelName = "ثالث" }
              if (j === 4) { levelName = "رابع" }
              if (j === 5) { levelName = "خامس" }
              if (j === 6) { levelName = "سادس" }
              let students = this.getStudentWithPhaseLevel(i, j, stu);
              levels = [...levels, { level: j, levelName: levelName,number:students.length, 
                students }];
                number+=students.length;
            }
            phases = [...phases, { phaes: phase, phaseName: "الابتدائية",number:number,levels:[...levels] }];
            // phase 2
          } else if (i === 2) {
            phase = 2;
            let levels: any[] = [];
            let number:number=0; 
            for (let j = 1; j <= 3; j++) {
              let levelName;
              if (j === 1) { levelName = "أولى" }
              if (j === 2) { levelName = "ثاني" }
              if (j === 3) { levelName = "ثالث" }
              let students = this.getStudentWithPhaseLevel(i, j, stu);
              levels = [...levels, { level: j, levelName: levelName, number:students.length,
                students }];
                number+=students.length;
            }
            phases = [...phases, { phaes: phase, phaseName: "الاعدادية",number:number,levels: [...levels] }];
            
          }
          else if (i === 3) {
            phase = 3;
            let levels: any[] = [];
            let number:number=0; 
            for (let j = 1; j <= 3; j++) {
              let levelName;
              if (j === 1) { levelName = "أولى" }
              if (j === 2) { levelName = "ثاني" }
              if (j === 3) { levelName = "ثالث" }
              let students = this.getStudentWithPhaseLevel(i, j, stu);
              levels = [...levels, { level: j, levelName: levelName,number:students.length,
                 students }];
                 number+=students.length;
            }
            phases = [...phases, { phaes: phase, phaseName: "ثانوية",number:number, levels:[...levels] }];
         
          }
        }
        return phases;
      }
      
  
// Handle error when subscribe

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
        
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };
}