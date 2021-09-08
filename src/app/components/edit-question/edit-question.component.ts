import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IQuestion } from 'src/app/shared/modules/question';
import { EditQuestion, SelectQuestion } from 'src/app/store/actions/question.actions';
import { selectCertainQuestion } from 'src/app/store/selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  ngOnInit() {
    document.body.classList.add('bg-img');
  }

  question: IQuestion = new IQuestion();
  buttonCaption = "Change!";

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store.dispatch(SelectQuestion({questionId : this.route.snapshot.params['id']}));
      this.store.select(selectCertainQuestion).subscribe(
        data => {
          this.question = data || this.question;
          
        });
    
  }

  edit(question:IQuestion) {
    this.store.dispatch(EditQuestion({ question : question}));
    this.router.navigate(['']);
  }

}