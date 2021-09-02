import { Component, OnInit } from '@angular/core';
import { formAction } from 'src/app/shared/modules/formfunctions';
import { IQuestion } from 'src/app/shared/modules/question';
import { CreateQuestion } from 'src/app/store/actions/question.actions';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  ngOnInit(): void {
    document.body.classList.add('bg-img');
  }

  question: IQuestion = new IQuestion();

  action: any = formAction.bind(null, ((params:any) => (CreateQuestion(params))));

  constructor(
  ) {
    this.action.actionTitle = "Create!";
    this.action.id = undefined;
  }

}