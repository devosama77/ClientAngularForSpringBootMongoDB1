import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentFormsService } from './student-forms.service';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'app-detials-form',
  templateUrl: './detials-form.component.html',
  styleUrls: ['./detials-form.component.css']
})
export class DetialsFormComponent implements OnInit {
  detailsGroup: FormGroup;
  // father job
  jobs: string[] = ['مدرس', 'مهني', 'مدير', 'تاجر',
  'رجل اعمال', 'فني', 'شرطي', 'سائق تاكسي', 'عامل', 'لايعمل'];
  get getLastName() {
    return this.detailsGroup.get('lastName');
  }
  get getFatherName() {
    return this.detailsGroup.get('middleName');
  }
  get getFirstName() {
    return this.detailsGroup.get('firstName');
  }
  get getFatherJob() {
    return this.detailsGroup.get('fatherJob');
  }
  get getBirthDay() {
    return this.detailsGroup.get('birthday');
  }
  get getLevel() {
    return this.detailsGroup.get('level');
  }
  get getPhase() {
    return this.detailsGroup.get('phase');
  }
  get getStreet() {
    return this.detailsGroup.get('contact').get('street');
  }
  get getCity() {
    return this.detailsGroup.get('contact').get('city');
  }
  get getPhone1() {
    return this.detailsGroup.get('contact').get('phone1');
  }
  get getEmail() {
    return this.detailsGroup.get('contact').get('email');
  }
  get getPhone2() {
    return this.detailsGroup.get('contact').get('phone2');
  }
  @Input() public data;
  streetControl = new FormControl();
  streets: string [] = ['شارع الهوجا', 'شارع انور غزيز', 'شارع بيت لاهيا', 'شارع السوق', 'شارع الخلفاء'];
  cities: string [] = ['غزة', 'معسكر جباليا', 'جباليا البلد', 'المشروع', 'بيت لاهيا', 'بيت حانون', 'خانيونس', 'رفح', 'الجرن', 'النصر'];
  levels: any[] = [];
  // birthday
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2015, 0, 1);
  constructor(private studentFormsService: StudentFormsService,
    private fb: FormBuilder) { }

  ngOnInit() {
   this.detailsGroup = this.fb.group({
     firstName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
     middleName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
     lastName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
     fatherJob: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
     birthday: ['', Validators.required],
     gender: [''],
     phase: ['', Validators.required],
     level: ['', Validators.required],
     contact: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
        phone1: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        phone2: ['', [Validators.maxLength(10), Validators.minLength(10)]],
        email: ['', Validators.email]
     })

   });
   this.detailsGroup.get('level').disable();
   this.detailsGroup.get('phase').valueChanges.subscribe(v => {
    const level = this.detailsGroup.get('level');
     if (v === '1') {
      level.enable();
      this.levels = [{n: '1', level: 'أول '}, {n: '2', level: 'ثاني'}, {n: '3', level: 'ثالث'},
      {n: '4', level: 'رابع'}, {n: '5', level: 'خامس'}, {n: '6', level: 'سادس'}];

     } else if (v === '2') {
      level.enable();
      this.levels = [{n: '1', level: 'أول'}, {n: '2', level: 'ثاني'}, {n: '3', level: 'ثالث'}];

     } else if (v === '3') {
      level.enable();
      this.levels = [{n: '1', level: 'أول'}, {n: '2', level: 'ثاني'}, {n: '3', level: 'ثالث'}];
     } else {
     level.disable();
     }
     level.updateValueAndValidity();
   });

  }
  openSubjecAndSendData(data) {
   this.studentFormsService.onShowSubjectFormChange(data);
  //  console.log("Data From Detials Opend  openSubjecAndSendData ")
  //  console.log(data);
  }
  onSubmit() {

    const phase = Number.parseInt(this.detailsGroup.value.phase);
    const level = Number.parseInt(this.detailsGroup.value.level);


    const d = {details: this.detailsGroup.value, phase, level, isSubject: true};

     this.openSubjecAndSendData(d);

  }

  //  clear Data
  clearAllFields(event: Event) {
    event.preventDefault();
    const phase = Number.parseInt(this.detailsGroup.value.phase);
    const level = Number.parseInt(this.detailsGroup.value.level);
    const d = {details: {}, phase: null, level: null, isSubject: false};
     this.openSubjecAndSendData(d);
    this.getFirstName.setValue('');
     this.getFatherName.setValue('');
     this.getLastName.setValue('');
     this.getFatherJob.setValue('');
     this.getPhase.setValue('');
     this.getLevel.setValue('');
     this.getBirthDay.setValue('');
     this.getEmail.setValue('');
     this.getPhone1.setValue('');
     this.getPhone2.setValue('');
     this.getStreet.setValue('');
     this.getCity.setValue('');


  }

  // Show errors

  getErrorLastName() {
    return this.getLastName.hasError('required') ? 'ادخل اسم العائلة' :
        this.getLastName.hasError('maxlength') ||
        this.getLastName.hasError('minlength') ? 'اسم العائلة بين 2 الى 15 حرف' : '';
  }
  getErrorFatherName() {
    return this.getFatherName.hasError('required') ? 'ادخل اسم الاب' :
        this.getFatherName.hasError('maxlength') ||
        this.getFatherName.hasError('minlength') ? 'اسم الاب بين 2 الى 15 حرف' : '';
  }
  getErrorFirstName() {
    return this.getFirstName.hasError('required') ? 'ادخل اسم الطالب' :
        this.getFirstName.hasError('maxlength') ||
        this.getFirstName.hasError('minlength') ? 'اسم الطالب بين 2 الى 15 حرف' : '';
  }
  getErrorFatherJob() {
    return this.getFirstName.hasError('required') ? 'ادخل وظيفة الاب ' :
        this.getFirstName.hasError('maxlength') ||
        this.getFirstName.hasError('minlength') ? ' وظيفة الاب بين 2 الى 15 حرف' : '';
  }
  getErrorBirthDay() {
    return this.getFirstName.hasError('required') ? 'ادخل تاريخ ميلاد الطالب' : '';
  }
  getErrorLevel() {
    return this.getFirstName.hasError('required') ? 'اختر المستوى الدراسي للطالب  '  : '';
  }
  getErrorPhase() {
    return this.getFirstName.hasError('required') ? 'اختر المرحلة التلعيمية للطالب' : '';
  }

  getErrorStreet() {
    return this.getStreet.hasError('required') ? 'ادخل اسم الشارع ' :
        this.getStreet.hasError('maxlength') ||
        this.getStreet.hasError('minlength') ? ' اسم الشارع  بين 2 الى 15 حرف' : '';
  }
  getErrorCity() {
    return this.getCity.hasError('required') ? 'ادخل اسم المدينة  ' :
        this.getCity.hasError('maxlength') ||
        this.getCity.hasError('minlength') ? '  اسم المدينة بين 2 الى 15 حرف' : '';
  }
  getErrorPhone1() {
    return this.getPhone1.hasError('required') ? 'ادخل رقم جوال ' :
        this.getPhone1.hasError('maxlength') ||
        this.getPhone1.hasError('minlength') ? '  رقم الجوال  عشر ارقام' : '';
  }
  getErrorEmail() {
    return this.getEmail.hasError('email') ? '  ادخل اميل مناسب '  : '';
  }
  getErrorPhone2() {
    return this.getPhone2.hasError('maxlength') ||
        this.getPhone2.hasError('minlength') ? '  رقم الجوال  عشر ارقام' : '';
  }
}
