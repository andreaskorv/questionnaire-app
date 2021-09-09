import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IQuestion } from 'src/app/shared/modules/question';

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrls: ['./question-component.component.scss']
})
export class QuestionComponentComponent implements OnInit, AfterViewChecked {

  questionForm: FormGroup;
  id: string = "";
  date: string = "";

  @Input() question = new IQuestion();
  @Input() buttonCaption = "";
  @Output() action = new EventEmitter<IQuestion>();

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector : ChangeDetectorRef
  ) {
    this.questionForm = this.formBuilder.group(
      {
        type: ["0", Validators.required],
        text: ["", Validators.required]
      }
    );
    
  }

  submit() {
    this.question.loadInformation(this.questionForm);
    this.action.emit(this.question);
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
    this.questionForm.patchValue(this.question);
    this.changeAnswers(this.question.type);
    this.type.valueChanges.subscribe(value => this.changeAnswers(value));
  }

  ngAfterViewChecked(){
     this.changeDetector.detectChanges();
    }

  changeAnswers(type: string) {
    if (type == "2") {
      this.questionForm.removeControl("options");
    } else if (!this.questionForm.contains("options")) {
      this.questionForm.addControl("options", this.formBuilder.array([]));
      for (let answer of this.question.options) {
        this.addOption(answer);
      }
      this.options.setValidators(this.optionsAbsenseValidator);
    }
  }

  optionsAbsenseValidator: ValidatorFn = (control: AbstractControl) => {

    const answers = control as FormArray;
    return (answers.controls.length == 0) ? { optionsAbsense : true} : null;
  }

  addOption(answer: string = "") {
    (this.options as FormArray).push(new FormGroup({
      answer: new FormControl(answer)
    }));
  }

  deleteOption(i: number) {
    (this.options as FormArray).removeAt(i);
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  get type() {
    return this.questionForm.get('type') as FormControl;
  }

  get text() {
    return this.questionForm.get('text') as FormControl;
  }
}