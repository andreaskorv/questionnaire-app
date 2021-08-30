import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  question: FormGroup;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.question = this.fb.group(
      {
        type: new FormControl(0),
        text: new FormControl(""),
        answers: this.fb.array([])
      });
    
  }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
  }

  addQuestion() {
    let question = new IQuestion();
    question.text = this.text.value;
    question.type = this.type.value;
    question.answers = this.answers.controls.map(item => item.value.answer);
    this.store.dispatch(CreateQuestion({question: question}));
    this.router.navigateByUrl('');
  }

  addOption() {
    this.answers.push(new FormGroup({
      answer: new FormControl("")
    }));
  }

  deleteOption(i: number) {
    this.answers.removeAt(i);
  }

  get answers() {
    return this.question.get('forAnswers') as FormArray;
  }

  get type() {
    return this.question.get('forType') as FormControl;
  }

  get text() {
    return this.question.get('forText') as FormControl;
  }

}