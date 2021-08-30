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
        forType: new FormControl(0),
        forText: new FormControl(""),
        forAnswers: this.formBuilder.array([])
      }
    );

    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
          this.id = queryParam['id'];
      }
    );
    console.log(this.id);
    this.store.select(selectAllQuestions).subscribe(
      data => {
        let question = data.filter(item => item.id == this.id)[0];
        this.date = question.date;
        this.forType.setValue(question.type);
        this.forText.setValue(question.text);
        for (let answer of question.answers) {
          this.addOption();
          this.forAnswers.controls[this.forAnswers.controls.length - 1].setValue({answer : answer});
        }

      });
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }

  editQuestion() {
    this.router.navigateByUrl('');
    let question = new IQuestion();
    question.id = this.id;
    question.text = this.forText.value;
    question.type = this.forType.value;
    question.date = this.date;
    question.answers = this.forAnswers.controls.map(item => item.value.answer);
    console.log(question);
    this.store.dispatch(EditQuestion({question: question}));
    this.router.navigateByUrl('');
  }

  addOption() {
    (this.forAnswers as FormArray).push(new FormGroup({
      answer: new FormControl("")
    }));
  }

  deleteOption(i: number) {
    (this.forAnswers as FormArray).removeAt(i);
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