export interface StudentMdoel{
  idStudent:string;
details:{ 
id:string,
firstName:string,
middleName:string,
lastName:string,
level:number,
phase:number,
fatherJob:string,
birthday:Date,
contact:{
     city:string,
    street:string,
    phone1:string,
    phone2?:string
        }

  },



}