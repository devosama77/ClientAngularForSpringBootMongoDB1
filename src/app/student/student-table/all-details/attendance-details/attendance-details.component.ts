import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StudentService } from '../../student.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit {
  displayedColumns2: string[] = ['notice','time','date','position'];
  dataSource2 = ELEMENT_DATA;
  isLinear = true;
  yearFormGroup: FormGroup;
  subjectFormGroup: FormGroup;
  regFormGroup:FormGroup;
  id;
  constructor(private _formBuilder: FormBuilder
    ,private studetnService:StudentService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      let id=paramMap.get('id');
      this.id=id;
    })
    this.studetnService.getStudent(this.id).subscribe(s=>{
        // console.log(s)
      })
    this.subjectFormGroup = this._formBuilder.group({
      subjectCtrl: ['', Validators.required],
      yearCtrl: ['', Validators.required]
    });
    this.regFormGroup=this._formBuilder.group({
      regCtrl:['',Validators.required]
    })
  }

}
