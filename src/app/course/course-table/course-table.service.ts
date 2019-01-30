import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseTableService {
  private url_register: string = "http://localhost:8080/regs/subjects";

  constructor(private http: HttpClient) { }
  // get All registrations 
  getAllRegistration(): Observable<any[]> {
    return this.http.get<any[]>(this.url_register).pipe(
      catchError(this.handleError)
    )
  }

  // filter all reigesteration as phase level
  filterRegByPhaseLevel(phase, level, registerArray) {
    return registerArray.filter(r => r.phase === phase && r.level === level ? r.phase === phase && r.level === level : false);
  }


  //  Change format the data (Student)
  changeFormatAsphasesLevels(reg) {
    let phases: any[] = [];
    for (let i = 1; i <= 3; i++) {
      let phase;
      if (i === 1) {
        phase = 1;
        let levels: any[] = [];
        // number all regs
        let number: number = 0;
        for (let j = 1; j <= 6; j++) {
          let levelName;
          if (j === 1) { levelName = "أولى" }
          if (j === 2) { levelName = "ثاني" }
          if (j === 3) { levelName = "ثالث" }
          if (j === 4) { levelName = "رابع" }
          if (j === 5) { levelName = "خامس" }
          if (j === 6) { levelName = "سادس" }
          let regs = this.filterRegByPhaseLevel(i, j, reg);
          levels = [...levels, { level: j, levelName: levelName, number: regs.length, regs }];
          number += regs.length;
        }
        phases = [...phases, { phaes: phase, phaseName: "الابتدائية", number: number, levels: [...levels] }];
        // phase 2
      } else if (i === 2) {
        phase = 2;
        let levels: any[] = [];
        let number: number = 0;
        for (let j = 1; j <= 3; j++) {
          let levelName;
          if (j === 1) { levelName = "أولى" }
          if (j === 2) { levelName = "ثاني" }
          if (j === 3) { levelName = "ثالث" }
          let regs = this.filterRegByPhaseLevel(i, j, reg);
          levels = [...levels, {
            level: j, levelName: levelName, number: regs.length,
            regs
          }];
          number += regs.length;
        }
        phases = [...phases, { phaes: phase, phaseName: "الاعدادية", number: number, levels: [...levels] }];

      }
      else if (i === 3) {
        phase = 3;
        let levels: any[] = [];
        let number: number = 0;
        for (let j = 1; j <= 3; j++) {
          let levelName;
          if (j === 1) { levelName = "أولى" }
          if (j === 2) { levelName = "ثاني" }
          if (j === 3) { levelName = "ثالث" }
          let regs = this.filterRegByPhaseLevel(i, j, reg);
          levels = [...levels, {
            level: j, levelName: levelName, number: regs.length,
            regs
          }];
          number += regs.length;
        }
        phases = [...phases, { phaes: phase, phaseName: "ثانوية", number: number, levels: [...levels] }];

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



