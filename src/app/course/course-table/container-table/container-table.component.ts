import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-container-table',
  templateUrl: './container-table.component.html',
  styleUrls: ['./container-table.component.css']
})
export class ContainerTableComponent implements OnInit {
  @Input() reg:any[]=[];
  tableRegs:any[]=[];
  constructor() { }

  ngOnInit() {
    let i=0;
    this.reg.map(r=>{
      i++;
      r.position=i}
      )
      this.reg.forEach(r=>{this.tableRegs.push(r)});
    
  }

  // displayedColumns:string[]=['more','notice','registerDate','teacher','courseName','position']
  displayedColumns:string[]=['more','notice','registerDate','teacher','courseName','position']
  dataSource = new MatTableDataSource<any[]>(this.tableRegs);
  selectedRowIndex;
  highlight(row) {
    this.selectedRowIndex = row.position;
    
  }
}
