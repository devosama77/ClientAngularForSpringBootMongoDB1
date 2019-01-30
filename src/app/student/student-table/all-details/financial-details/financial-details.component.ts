import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StudentService } from '../../student.service';
import { MatTableDataSource } from '@angular/material';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-financial-details',
  templateUrl: './financial-details.component.html',
  styleUrls: ['./financial-details.component.css']
})
export class FinancialDetailsComponent implements OnInit {
  // displayedColumns: string[] = ['payments', 'fees', 'position'];
  displayedColumns: string[];
  dataSource =new MatTableDataSource<any>(); 
  id;
  response;
  students:any[]=[]
  dataTable:any[]=[];
   regSubjects:any[]=[];
   totalFees:number=0;
   totalPays:number=0;
   total:number=0;
  constructor(private activatedRoute:ActivatedRoute,private studentService:StudentService ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      let id = paramMap.get('id');
      console.log(paramMap)
      this.id = id;
    })
    
    this.studentService.getStudent(this.id).subscribe(res => {
      this.response = res;
      this.students = this.response.students
      let data:any[]=[];
     
        this.students.forEach(stu => {
          
           stu.registerStudents.forEach(reg => {
             this.totalFees+=reg.registerFinancial.fees;
              
             data= this.calcPayments(reg);
             this.dataTable.push(data)
             this.totalPays+= this.getAllPayments(data)
         });  
        });
        this.total=this.getTotoal(this.totalFees,this.totalPays)
        this.dataSource.data=this.dataTable;
    })
    this.displayedColumns= ['payments','fees'];
  }

  getTotoal(fees,payments){
    return fees-payments;
  }

  calcPayments(reg){
    let totalPayments:number=0;
    reg.registerFinancial.payments.forEach(p=>{
      totalPayments+=p.payments;
    })
    reg.registerFinancial.payments.total=totalPayments;
    return reg;
  }

  getAllPayments(data){
    let total;
   total= data.registerFinancial.payments.total;
   return total;
  }

}
