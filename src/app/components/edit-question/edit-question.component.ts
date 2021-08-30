import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IQuestion } from 'src/app/shared/modules/question';
import { EditQuestion } from 'src/app/store/actions/question.actions';
import { selectAllQuestions, selectCertainQuestion } from 'src/app/store/selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  question: FormGroup;
  id: string = "";
  date: string = "";
  querySubscription: Subscription | undefined;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.question = this.formBuilder.group(
      {
        type: new FormControl(0),
        text: new FormControl(""),
        answers: this.formBuilder.array([])
      }
    );

    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
          this.id = queryParam['id'];
      }
    );
    this.store.select(selectAllQuestions).subscribe(
      data => {
        let question = data.filter(item => item.id == this.id)[0];
        this.date = question.date;
        this.type.setValue(question.type);
        this.text.setValue(question.text);
        for (let answer of question.answers) {
          this.addOption();
          this.answers.controls[this.answers.controls.length - 1].setValue({answer : answer});
        }

      });
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }

  editQuestion() {
    let question = new IQuestion();
    question.id = this.id;
    question.text = this.text.value;
    question.type = this.type.value;
    question.date = this.date;
    question.answers = this.answers.controls.map(item => item.value.answer);
    this.store.dispatch(EditQuestion({question: question}));
    this.router.navigateByUrl('');
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
    return this.question.get('forAnswers') as FormArray;
  }

  get type() {
    return this.question.get('forType') as FormControl;
  }

  get text() {
    return this.question.get('forText') as FormControl;
  }

}