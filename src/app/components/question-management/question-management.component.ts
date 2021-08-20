import { Component, OnInit } from '@angular/core';
import { IQuestion } from 'src/app/shared/modules/question';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {

  questions?: IQuestion[];

  constructor() { }

  ngOnInit(): void {
  }

}
