import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { InfoService } from "src/app/shared/services/info.service";
import { GetDataFailure, GetDataSuccess } from "../actions/initial.actions";
import { EQuestionActions } from "../actions/question.actions";

@Injectable()
export class InitialEffects {
    
    getData$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.GetDataAction),
        map(() =>
        {
          console.log("Жак де Молэ");
          let forJSON = this.infoService.getData();
          try {
            const data = JSON.parse(forJSON);
            return GetDataSuccess({data : data});
          }
          catch {
            return GetDataFailure();
          }
            }
        )
      ));
    
      constructor(
        private actions$: Actions,
        private infoService: InfoService
      ) {}
}