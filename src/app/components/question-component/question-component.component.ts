import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IQuestion } from 'src/app/shared/modules/question';

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrls: ['./question-component.component.scss']
})
export class QuestionComponentComponent implements OnInit {

  questionForm: FormGroup;
  id: string = "";
  date: string = "";

  @Input() action: any;
  @Input() question?: IQuestion;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.questionForm = this.formBuilder.group(
      {
        type: new FormControl(0),
        text: new FormControl(""),
        answers: this.formBuilder.array([])
      }
    );
      // дописать присвоение переданного question 
    
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }

  

  addOption() {
    (this.answers as FormArray).push(new FormGroup({
      answer: new FormControl("")
    }));
  }

  deleteOption(i: number) {
    (this.answers as FormArray).removeAt(i);
  }

  get answers() {
    return this.questionForm.get('forAnswers') as FormArray;
  }

  get type() {
    return this.questionForm.get('forType') as FormControl;
  }

  get text() {
    return this.questionForm.get('forText') as FormControl;
  }

}
