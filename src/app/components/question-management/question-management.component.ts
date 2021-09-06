import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IQuestion } from 'src/app/shared/modules/question';
import { RemoveAnswer, RemoveQuestion } from 'src/app/store/actions/question.actions';
import { selectAllQuestions } from 'src/app/store/selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {

  questions: IQuestion[] = [];

  questionTypes: string[] = [
    "Single answer",
    "Multiple answers",
    "Open answer"
  ];

  constructor(
    private store: Store<IAppState>
    ) {
     }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
    this.store.select(selectAllQuestions).subscribe(
    data => {
      this.questions = data;
    }
  );
  }

  removeQuestion(index: number) {
    this.store.dispatch(RemoveQuestion({questionId : this.questions[index].id}));
  }

}
