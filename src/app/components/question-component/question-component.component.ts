import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IQuestion } from 'src/app/shared/modules/question';
import { selectAllQuestions } from 'src/app/store/selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrls: ['./question-component.component.scss']
})
export class QuestionComponentComponent implements OnInit {

  questionForm: FormGroup;
  question: IQuestion = new IQuestion();
  id: string = "";
  date: string = "";

  @Input() action: any;

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.questionForm = this.formBuilder.group(
      {
        type: new FormControl(0),
        text: new FormControl(""),
        answers: this.formBuilder.array([])
      },
      { validators : this.optionsAbsenseValidator}
    );
    
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
    if (this.action.id) {
      this.store.select(selectAllQuestions).subscribe(
        data => {
          this.question = data.filter(item => item.id == this.action.id)[0];
        });
    }
    else {
      this.question = new IQuestion();
    }
    this.questionForm.patchValue(this.question);
    for (let answer of this.question.answers) {
      this.addOption(answer);
    }
  }

  optionsAbsenseValidator: ValidatorFn = (control: AbstractControl) => {
    const type = control.get("type");
    const answers = control.get("answers");
    return (type && answers && type.value != 2 && (answers as FormArray).controls.length == 0) ? { optionsAbsense : true} : null;
  }

  addOption(answer: string = "") {
    (this.answers as FormArray).push(new FormGroup({
      answer: new FormControl(answer)
    }));
  }

  deleteOption(i: number) {
    (this.answers as FormArray).removeAt(i);
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  get type() {
    return this.questionForm.get('type') as FormControl;
  }

  get text() {
    return this.questionForm.get('text') as FormControl;
  }

}
