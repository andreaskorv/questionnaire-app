import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IQuestion } from 'src/app/shared/modules/question';
import { CreateQuestion } from 'src/app/store/actions/question.actions';
import { IAppState } from 'src/app/store/state/app.state';

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
  buttonCaption = "Create!";

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {}

  create(question: IQuestion) {
    this.store.dispatch(CreateQuestion({ question : question}));
    this.router.navigate(['']);
  }

}