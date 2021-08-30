import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetData } from './store/actions/question.actions';
import { IAppState } from './store/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'questionnaire-app';

  constructor(
    private store: Store<IAppState>
  ) {
    
   }

   ngOnInit() {
     this.store.dispatch(GetData());
   }
}
