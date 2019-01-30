import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { StudentFormsService } from './detials-form/student-forms.service';

@Component({
  selector: 'app-student-froms',
  templateUrl: './student-froms.component.html',
  styleUrls: ['./student-froms.component.css']
})
export class StudentFromsComponent implements OnInit,OnDestroy {
  showSubjectFormChangeSubscription:Subscription;
  public isSubject=false;
  public data={};
  public newData={}
  constructor(private studentFormsService:StudentFormsService) { }
   
  ngOnInit() {
   this.showSubjectFormChangeSubscription= 
                                  this.studentFormsService.showSubjectFormChange.subscribe(su=>{
                              this.isSubject=su.isSubject;
                              // this.data=su;
                              // console.log("Data from Student Froms.. showSubjectFormChangeSubscription ")
                              // console.log(this.data);
                              this.newData={...su};
                              // console.log(this.newData)

    })
  }
   ngOnDestroy(){
     this.showSubjectFormChangeSubscription.unsubscribe();
   }
}
