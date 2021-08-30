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
        forType: new FormControl(0),
        forText: new FormControl(""),
        forAnswers: this.fb.array([])
      });
    
  }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
  }

  addQuestion() {
    let question = new IQuestion();
    question.text = this.forText.value;
    question.type = this.forType.value;
    question.answers = this.forAnswers.controls.map(item => item.value.answer);
    this.store.dispatch(CreateQuestion({question: question}));
    this.router.navigateByUrl('');
  }

  addOption() {
    this.forAnswers.push(new FormGroup({
      answer: new FormControl("")
    }));
  }

  deleteOption(i: number) {
    this.forAnswers.removeAt(i);
  }

  get forAnswers() {
    return this.question.get('forAnswers') as FormArray;
  }

  get forType() {
    return this.question.get('forType') as FormControl;
  }

  get forText() {
    return this.question.get('forText') as FormControl;
  }

}