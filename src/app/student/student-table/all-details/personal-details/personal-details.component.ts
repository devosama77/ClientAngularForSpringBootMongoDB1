import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StudentService } from '../../student.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StudentMdoel } from 'src/app/student/student.model';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  details: any = {};
  response;
  student;
  id;
  contact: any = {};

  constructor(private studetnService: StudentService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      let id = paramMap.get('id');
      this.id = id;
      //  console.log("ngOnInit()...personal")
    })

    this.studetnService.getStudent(this.id).subscribe(res => {
      this.response = res;
      this.student = this.response.students
      this.student.forEach(d => {
        this.details = { ...d.details };
        let phaseLevel = this.getPhaeAndLevel(this.details.phase, this.details.level);
        this.details.phase = phaseLevel.phase;
        this.details.level = phaseLevel.level;
        this.contact = { ...this.details.contact }
        // console.log(this.contact)
      })
    })
  }

  getPhaeAndLevel(phase, level) {
    let ph;
    let le;
    switch (phase) {
      case 1:
        ph = "ابتدائي";
        if (level === 1) { le = "أول"; };
        if (level === 2) { le = "ثاني"; };
        if (level === 3) { le = "ثالث"; };
        if (level === 4) { le = "رابع"; };
        if (level === 5) { le = "خامس"; };
        if (level === 6) { le = "سادس"; };
        break;
      case 2:
        ph = "اعدادية";
        if (level === 1) { le = "أول"; }
        if (level === 2) { le = "ثاني"; }
        if (level === 3) { le = "ثالث"; }
        break;
      case 3:
        ph = "ثانوية";
        if (level === 1) { le = "أول"; }
        if (level === 2) { le = "ثاني"; }
        if (level === 3) { le = "ثالث"; }
        break;
    }
    return { phase: ph, level: le }
  }
}
