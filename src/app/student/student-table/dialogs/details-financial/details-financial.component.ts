import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { StudentMdoel } from 'src/app/student/student.model';


@Component({
  selector: 'app-details-financial',
  templateUrl: './details-financial.component.html',
  styleUrls: ['./details-financial.component.css']
})
export class DetailsFinancialComponent implements OnInit {

  financialArray;
  totalPayments;
  totalFees;
  total;
  name;
  dataSource =new MatTableDataSource<StudentMdoel>(); 
  displayedColumns: string[] = ['notice','time','date','payments','fees'];
  
  constructor(@Inject(MAT_DIALOG_DATA) public passData: any) { 
    this.financialArray=passData.financial;
    this.name=passData.name;
    this.dataSource.data=this.financialArray;   
   
  this.sumPayments(this.financialArray);
  this.totalPayments=this.financialArray.sumAll;
  this.totalFees=this.financialArray.sumFees;
  this.total=this.getTotoal(this.totalFees,this.totalPayments);
   }
   getTotoal(fees,payments){
     return fees-payments;
   }
  ngOnInit() {
   
  }
  sumPayments(a){
    let sumall=0;
    let fees=0;
    a.forEach(element => {
       let sum=0;
       element.payments.forEach(p=>{
            sum+=p.payments;
            })
      fees+=element.fees
      sumall+=sum;
      element.sumPayments=sum; 
    });
    a.sumFees=fees;
    a.sumAll=sumall;
    
  }
  
  
 
}
