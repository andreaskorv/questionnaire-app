import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formAction } from 'src/app/shared/modules/formfunctions';
import { IQuestion } from 'src/app/shared/modules/question';
import { EditQuestion } from 'src/app/store/actions/question.actions';

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
  querySubscription: Subscription | undefined;
  action: any = formAction.bind(null, ((params:any) => (EditQuestion(params))));

  constructor(
    private route: ActivatedRoute
  ) {
    this.action.actionTitle = "Change!";
    //console.log(this.action.id);
    //console.log(this.route.snapshot.params['id']);
    this.action.id = this.route.snapshot.params['id'];
    //console.log(this.action.id);
    
  }

}