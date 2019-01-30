import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StudentTableAllDetialsService {
  url_student:string="http://localhost:8080/students/student";
  changeShowAttendance=new Subject<any>();
  data;
  constructor(private http:HttpClient) { }

  getStudent(id):Observable<any[]>{
   
    // console.log(" getStudent(id)")
    return this.http.get<any[]>(this.url_student+"/"+id).pipe(
      catchError(this.handleError)
    )
  }
  
 
  onChangeShowAttendance(){
    this.changeShowAttendance.next({isShow:true,title:"حضور وغياب"});
  }
  onHideShowAttendace(){
    this.changeShowAttendance.next({isShow:false,title:"الدورات المسجلة"});
  }


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
