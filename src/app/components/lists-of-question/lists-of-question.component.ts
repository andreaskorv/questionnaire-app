import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { multipleAnswersCollector } from 'src/app/shared/modules/functions';
import { EQuestionType, IQuestion } from 'src/app/shared/modules/question';
import { CreateAnswer, RemoveAnswer } from 'src/app/store/actions/question.actions';
import { selectAnsweredQuestions, selectUnansweredQuestions } from 'src/app/store/selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-lists-of-question',
  templateUrl: './lists-of-question.component.html',
  styleUrls: ['./lists-of-question.component.scss']
})
export class ListsOfQuestionComponent implements OnInit {

  answeredQuestions: IQuestion[] = [];
  unansweredQuestions: IQuestion[] = [];

  unansweredQuestionsForm: FormGroup[];

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder
  ) {
      this.unansweredQuestionsForm = [];
   }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
    this.store.select(selectAnsweredQuestions).subscribe(
      data => {
        this.answeredQuestions = data;
      }
    );
    this.store.select(selectUnansweredQuestions).subscribe(
      data => {
        this.unansweredQuestions = data;
        this.unansweredQuestionsForm = this.unansweredQuestions.map((item, index) => {
          switch (item.type) {
            case "0":
              return (this.formBuilder.group({
                answer: new FormControl(0)
              }));
              break;
            case "1":
              return (this.formBuilder.group({
                answer: this.formBuilder.array(Array.from({length : item.options.length}).fill(false))
              }));
              break;
            default:
            case "2":
              return (this.formBuilder.group({
                answer: new FormControl("")
              }));
              break;
          }
        });
      }
    );
  }

  addAnswer(i: number) {
    
    let questionCard = this.unansweredQuestionsForm[i];
    let forAnswer = questionCard.get("answer")?.value;
    if (this.unansweredQuestions[i].type == EQuestionType.EMultipleAnswers.toString()) {
      forAnswer = forAnswer.reduce(multipleAnswersCollector, []);
    }
    this.store.dispatch(CreateAnswer({questionId : this.unansweredQuestions[i].id, answer : forAnswer}));
  }

  removeAnswer(i: number) {
    this.store.dispatch(RemoveAnswer({questionId : 
      this.answeredQuestions[i].id
    }));
  }

  answers(i: number, j: number) {
    let forArray = this.unansweredQuestionsForm[i].get("answer") as FormArray;
    return forArray.at(j) as FormControl;
  }

  isAnswerValid(i: number) {
    let questionCard = this.unansweredQuestionsForm[i];
    let forAnswer = questionCard.get("answer")?.value;
    if (this.unansweredQuestions[i].type == EQuestionType.EMultipleAnswers.toString()) {
      forAnswer = forAnswer.reduce(multipleAnswersCollector, []);
      return (forAnswer.length == 0);
    }
    if (this.unansweredQuestions[i].type == EQuestionType.EOpenAnswer.toString()) {
      return (forAnswer.length == 0);
    }
    return false;
  }

}