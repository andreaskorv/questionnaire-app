import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { CreateAnswerFailure, CreateAnswerSuccess, CreateQuestionFailure, CreateQuestionSuccess, EditQuestionFailure, EditQuestionSuccess, EQuestionActions, GetDataFailure, GetDataSuccess, RemoveAnswerFailure, RemoveAnswerSuccess, RemoveQuestionFailure, RemoveQuestionSuccess } from "../actions/question.actions";
import { catchError, map, switchMap } from 'rxjs/operators';
import { InfoService } from "src/app/shared/services/info.service";
import { changeQuestion, createQuestion, removeQuestion } from "src/app/shared/modules/changedb";
import { IQuestion } from "src/app/shared/modules/question";

@Injectable()
export class QuestionEffects {

  getData$ = createEffect(() => this.actions$.pipe(
    ofType(EQuestionActions.GetDataAction),
    map(() =>
    {
      let forJSON = this.infoService.getData();
      try {
        const data = JSON.parse(forJSON).questionState.questions.map((item: IQuestion) => {
          const {...object} = item;
          return item;
        });
        return GetDataSuccess({data : data});
      }
      catch {
        return GetDataFailure();
      }
        }
    )
  ));
    
    createQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.CreateQuestionAction),
        map((data: any) => (this.infoService.prototypeFunction(data.question, createQuestion)) ? CreateQuestionSuccess(data) : CreateQuestionFailure()
          )
      ));
    
    editQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.EditQuestionAction),
        map((data: any) => (this.infoService.prototypeFunction(data.question, changeQuestion)) ? EditQuestionSuccess(data) : EditQuestionFailure()
        
          )
      ));
    
    removeQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.RemoveQuestionAction),
        map((data: any) => (this.infoService.prototypeFunction(data.question, removeQuestion)) ? RemoveQuestionSuccess(data) : RemoveQuestionFailure()
          )
      ));
    
    createAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.CreateAnswerAction),
        map((data: any) => (this.infoService.prototypeFunction(data.question, changeQuestion)) ? CreateAnswerSuccess(data) : CreateAnswerFailure()
          )
      ));
    
    removeAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.RemoveAnswerAction),
        map((data: any) => (this.infoService.prototypeFunction(data.question, changeQuestion)) ? RemoveAnswerSuccess(data) : RemoveAnswerFailure()
          )
      ));
    
      constructor(
        private actions$: Actions,
        private infoService: InfoService
      ) {}
}