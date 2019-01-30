import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StudentTableAllDetialsService } from '../../student-table-all-detials.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


export interface PeriodicElement {
  saterday: string;
  position: number;
  monday: string;
  wednesday: string;
  date: Date
}

const headerData: any = {
  saterday: "start: 3:30 , End: 5:30",
  monday: "start: 3:30 , End: 5:30"
  , wednesday: "start: 3:30 , End: 5:30"
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },
  { position: 1, saterday: ' 4 (غاب)', monday: "(6) غاب", wednesday: ' 8 (لم يغب)', date: new Date() },

];


@Component({
  selector: 'app-show-attendace',
  templateUrl: './show-attendace.component.html',
  styleUrls: ['./show-attendace.component.css']
})
export class ShowAttendaceComponent implements OnInit {
  get getYearControl(){
    return this.yearsMonthsGroup.get('yearControl');
  }
  get getMonthControl(){
    return this.yearsMonthsGroup.get('monthControl');
  }
  constructor(private studentTableAllDetialsService: StudentTableAllDetialsService
    , private router: Router, private fb: FormBuilder) { }
  response;
  students;
  public details: any = {};
  public subjects: any[] = []
  @Input() regSubjects;
  dateArray:Date[]=[]
  title: string = " الدورات المسجلة ";
  header: string[] = [];
  headerData: any = {}
  tableData: any[] = [];
  displayedColumns: string[];
  columnsToDisplay: string[];
  data: any[];
  dHeader = headerData;
  years:number[]=[];
  maxYear:number;
  monthsNumber:number[]=[];
  monthsName:any[]=[];
  maxMonth:number;
  maxMonthName:any;
  yearsMonthsGroup:FormGroup;

  ngOnInit() {
    let regdata: any[] = [...this.regSubjects];
    regdata.forEach(reg => {
      let myDate: Date;
      // let dateArray:Date[]=[]
      reg.attendanceList.forEach(d => {
        let date = d.attendancesDate;
        let datepars = Date.parse(date);
        myDate = new Date(datepars);
        this.dateArray.push(myDate);
        
      })
     this.years=this.getYears(this.dateArray);
     this.maxYear=this.getMaxYearorMonths(this.years);

     this.monthsNumber=this.getMonthsByYear(this.dateArray,this.maxYear);
     this.monthsName=this.getMonthsName(this.monthsNumber);
     this.maxMonth=this.getMaxYearorMonths(this.monthsNumber)
     this.maxMonthName=this.getMonthName(this.maxMonth);
    
      this.headerData = this.getHeaderTable(reg, this.maxYear, this.maxMonth);
      this.tableData = this.getTableData(reg, this.maxYear, this.maxMonth);  
      this.header = this.getHeader(reg, this.maxYear, this.maxMonth);
      // console.log(this.tableData);
      // console.log(this.headerData);
      // console.log(this.header);
      this.displayedColumns = this.header;
      this.displayedColumns.push("week")
      this.columnsToDisplay = this.displayedColumns.slice();
      this.data = this.tableData;
      this.dHeader = this.headerData;
      
    })
    this.yearsMonthsGroup=this.fb.group({
      yearControl:[this.maxYear],
      monthControl:[this.maxMonth]
    })

    this.getYearControl.valueChanges.subscribe(year=>{
      this.getAllDataToTableForYearControl(year)
    })
    this.getMonthControl.valueChanges.subscribe(month=>{
      let year=this.getYearControl.value;
      this.getAllDataToTableForMonthControl(year,month);
    }
    )
  }

  getAllDataToTableForYearControl(year){
    let regdata: any[] = [...this.regSubjects];
    regdata.forEach(reg => {
      let myDate: Date;
      reg.attendanceList.forEach(d => {
        let date = d.attendancesDate;
        let datepars = Date.parse(date);
        myDate = new Date(datepars);
        this.dateArray.push(myDate);  
      })
      this.monthsNumber=this.getMonthsByYear(this.dateArray,year);
      this.monthsName=this.getMonthsName(this.monthsNumber);
      this.maxMonth=this.getMaxYearorMonths(this.monthsNumber)
      this.maxMonthName=this.getMonthName(this.maxMonth);
      this.getMonthControl.setValue(this.maxMonth)
      this.headerData = this.getHeaderTable(reg, year, this.maxMonth);
      this.tableData = this.getTableData(reg, year, this.maxMonth);  
      this.header = this.getHeader(reg, year,  this.maxMonth);

      this.displayedColumns = this.header;
      this.displayedColumns.push("week")
      this.columnsToDisplay = this.displayedColumns.slice();
      this.data = this.tableData;
      this.dHeader = this.headerData;
      
    })
  }

  getAllDataToTableForMonthControl(year,month){
    let regdata: any[] = [...this.regSubjects];
    regdata.forEach(reg => {
      let myDate: Date;
      reg.attendanceList.forEach(d => {
        let date = d.attendancesDate;
        let datepars = Date.parse(date);
        myDate = new Date(datepars);
        this.dateArray.push(myDate);  
      })
      this.monthsNumber=this.getMonthsByYear(this.dateArray,year);
      this.monthsName=this.getMonthsName(this.monthsNumber);
      this.maxMonth=this.getMaxYearorMonths(this.monthsNumber)
      this.maxMonthName=this.getMonthName(this.maxMonth);
  
      this.headerData = this.getHeaderTable(reg, year, month);
      this.tableData = this.getTableData(reg, year, month);  
      this.header = this.getHeader(reg, year,  month);
 
      this.displayedColumns = this.header;
      this.displayedColumns.push("week")
      this.columnsToDisplay = this.displayedColumns.slice();
      this.data = this.tableData;
      this.dHeader = this.headerData;
      
    })
  }
  // header table
  getHeaderTable(reg, year, month) {
    let myDate: Date;
    let dayTime = {};
    reg.attendanceList.forEach(d => {
      let date = d.attendancesDate;
      let datepars = Date.parse(date);
      myDate = new Date(datepars);
      if (myDate.getFullYear() === year && myDate.getMonth() === month) {
        let day = myDate.getDay();
        let dayName = this.getDayName(day);
        let time = dayName + "|Start Time : " + myDate.getHours() + ":" +
          myDate.getMinutes() + "|End Time : " + d.endTime;
        dayTime[dayName] = time
      }
    })
    let week="week";
    dayTime[week]="week";
    return dayTime;
  }
  // ****************************************************
  // Table Data
  getTableData(reg, year, month) {
    let week1 = {};
    let week2 = {};
    let week3 = {};
    let week4 = {}
    let week5 = {}
    let position = "position";
    let numDateArray: any[] = []
    let myDate: Date;
    let DateObject: any[] = [];

    reg.attendanceList.forEach(d => {
      
      let date = d.attendancesDate;

      let datepars = Date.parse(date);
      myDate = new Date(datepars);

      if (myDate.getFullYear() === year && myDate.getMonth() === month) {
        let status = d.status;
        let notice = d.notic;
        if (notice === undefined || notice === null) {
          notice = ""
        }
        let statusName = this.getStatusName(status);

        let day = myDate.getDay();
        let dayName = this.getDayName(day);


        numDateArray.push(day);
        let count = numDateArray.filter(x => x === day).length;

        if (count === 1) {
          week1[dayName] = notice + " | " + statusName + " | (" + myDate.getDate() + ")";

        }
        if (count === 2) {
          week2[dayName] = notice + " | " + statusName + " | (" + myDate.getDate() + ")";

        }
        if (count === 3) {
          week3[dayName] = notice + " | " + statusName + " | (" + myDate.getDate() + ")";

        }
        if (count === 4) {
          week4[dayName] = notice + " | " + statusName + " | (" + myDate.getDate() + ")";

        }
        if (count === 5) {
          week5[dayName] = notice + " | " + statusName + " | (" + myDate.getDate() + ")";

        }

      }
    })
    DateObject.push(week1, week2, week3, week4, week5);
    let i = 0;
     DateObject.map(d => {
      i++;
      return d.week = i
    })
    return DateObject;

  }
  // *******************************************************
  // Header Table
  getHeader(reg, year, month) {
    let dayNumbers: number[] = []
    let myDate: Date;
    reg.attendanceList.forEach(d => {
      let date = d.attendancesDate;
      let datepars = Date.parse(date);
      myDate = new Date(datepars);
      if (myDate.getFullYear() === year && myDate.getMonth() === month) {
        let day = myDate.getDay();
        dayNumbers.push(day);
      }
    })
    let daysNames = this.getDaysName(dayNumbers);
    return daysNames;
  }
  // *******************************************************

  getStatusName(status) {
    let statusArray: any[] = ["لم يسجل", "غاب", "لم يغب"]
    return statusArray[status];
  }
  getDatesByMonth(dates: Date[], month) {
    return dates.filter(d => d.getMonth() === month)
  }

  getMonths(dates: Date[]) {
    let x = (names) => names.filter((v, i) => names.indexOf(v) === i);
    let monthsDuplicated: number[] = [];
    dates.forEach(d => {
      monthsDuplicated.push(d.getMonth())
    })
    return x(monthsDuplicated);
  }

  getYears(dates: Date[]) {
    let x = (names) => names.filter((v, i) => names.indexOf(v) === i);
    let yearDuplicated: number[] = [];
    dates.forEach(d => {
      yearDuplicated.push(d.getFullYear())
    })
    return x(yearDuplicated);
  }
  getMonth(arr: Date[], month) {
    return arr.filter(d => d.getMonth() === month);
  }
  getYear(arr: Date[], year) {
    return arr.filter(d => d.getFullYear() === year)
  }
  getMonthsName(monthsNumber: number[]) {
    let months = ["January", "February", "March"
      , "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthsName: any[] = [];
    monthsNumber.forEach(m => {
      monthsName.push({ name: months[m], number: m })
    })
    return monthsName;
  }
  getMonthName(monthNumber:number){
    let months = ["January", "February", "March"
    , "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return months[monthNumber];
  }
  getDayName(day) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
  }
  getDaysName(daysNumber: number[]) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let daysArray: any[] = [];
    daysNumber.forEach(d => {
      daysArray.push(days[d]);
    })
    let x = (names) => names.filter((v, i) => names.indexOf(v) === i);

    return x(daysArray);
  }
  getMaxYearorMonths(arr: any[]) {
    let max = arr.reduce(function (a, b) {
      return Math.max(a, b);
    });
    return max;
  }
  getMonthsByYear(dateArray:Date[],year){
    let myDateArray:Date[]=[...dateArray]
    let  dateArrayYear= myDateArray.filter(d=>d.getFullYear()===year)
    let months =this.getMonths(dateArrayYear);
    return months;
  }

  




  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }


  onBack() {
    this.studentTableAllDetialsService.onHideShowAttendace();

  }


}
