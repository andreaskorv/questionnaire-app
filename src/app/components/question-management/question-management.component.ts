import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IQuestion } from 'src/app/shared/modules/question';
import { RemoveQuestion } from 'src/app/store/actions/question.actions';
import { selectAllQuestions } from 'src/app/store/selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {

  questions: IQuestion[] = [];

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

  removeQuestion(questionId: string) {
    this.store.dispatch(RemoveQuestion({questionId : questionId}));
  }

}
