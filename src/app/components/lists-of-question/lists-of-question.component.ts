import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { State, Store } from '@ngrx/store';
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
      data => {this.unansweredQuestions = data;
        this.unansweredQuestionsForm = [];
        for (let unansweredQuestion of this.unansweredQuestions) {
          let forAnswers = unansweredQuestion.answers.map((item) => (new FormGroup({
            isSelected: new FormControl(false)
          })));
          this.unansweredQuestionsForm.push(this.formBuilder.group({
            singleAnswer: new FormControl(0),
            multipleAnswers: this.formBuilder.array(forAnswers),
            openAnswer: new FormControl("")
          }));
        }
      }
    );
  }

  addAnswer(i: number) {
    
    let questionCard = this.unansweredQuestionsForm[i];
    let forAnswer = undefined;
    if (this.unansweredQuestions[i].type == EQuestionType.ESingleAnswer.toString())
    {
      forAnswer = questionCard.get("singleAnswer")?.value;
    }
    else if (this.unansweredQuestions[i].type == EQuestionType.EMultipleAnswers.toString()) {
      let answers = (questionCard.get("multipleAnswers") as FormArray).controls;
      forAnswer = [];
      for (let answer of answers) {
        let checkbox = (answer as FormGroup)?.get("isSelected");
        if (checkbox?.value) {
          forAnswer.push(answers.indexOf(answer));
        }
      }
    }
    else if (this.unansweredQuestions[i].type == EQuestionType.EOpenAnswer.toString()) {
      forAnswer = questionCard.get("openAnswer")?.value;
    }
    this.store.dispatch(CreateAnswer({questionId : this.unansweredQuestions[i].id, answer : forAnswer}));
  }

  removeAnswer(i: number) {
    this.store.dispatch(RemoveAnswer({questionId : 
      this.answeredQuestions[i].id
    }));
  }

  check(i: number, j: number) : boolean {
    return this.answeredQuestions[i].truth?.closedAnswer.includes(j) || false;
  }

}
