import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { IQuestion } from 'src/app/shared/modules/question';
import { IAnswer } from 'src/app/shared/modules/answer';
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
          let forAnswers = [];
          for (let answer of unansweredQuestion.answers) {
            forAnswers.push(new FormGroup({
              isSelected: new FormControl(false)
            }));
          }
          this.unansweredQuestionsForm.push(this.formBuilder.group({
            answers: this.formBuilder.array(forAnswers),
            text: new FormControl("")
          }));
        }
      }
    );
  }

  isAnswerUncorrect(i: number) : boolean {
    let questionCard = this.unansweredQuestionsForm[i];
    if (this.unansweredQuestions[i].type != 2) {
      let forCheck = 0;
      for (let answer of (questionCard.get("answers") as FormArray).controls) {
        let checkbox = (answer as FormGroup)?.get("isSelected");
        if (checkbox?.value) {
          forCheck++;
        }
        if (forCheck > 1 && this.unansweredQuestions[i].type == 0) {
          return true;
        }
      }
      if (forCheck == 0) return true;
    }
    else if (this.unansweredQuestions[i].type == 2) {
      return questionCard.get("text")?.value > 255;
    }
    return false;
  }

  addAnswer(i: number) {
    let forAnswer: IAnswer = {
      closedAnswer: [],
      openAnswer: ""
    };
    
    let questionCard = this.unansweredQuestionsForm[i];
    if (this.unansweredQuestions[i].type != 2) {
      let answers = (questionCard.get("answers") as FormArray).controls;
      for (let answer of answers) {
        let checkbox = (answer as FormGroup)?.get("isSelected");
        if (checkbox?.value) {
          forAnswer.closedAnswer.push(answers.indexOf(answer));
        }
      }
    }
    else {
      forAnswer.openAnswer = questionCard.get("text")?.value;
    }


    this.store.dispatch(CreateAnswer({question : ({...this.unansweredQuestions[i], truth: forAnswer} as IQuestion)}));
  }

  removeAnswer(i: number) {
    this.store.dispatch(RemoveAnswer({question : ({...this.answeredQuestions[i], truth: undefined} as IQuestion)}));
  }

  check(i: number, j: number) : boolean {
      return this.answeredQuestions[i].truth?.closedAnswer.includes(j) || false;
  }

}
