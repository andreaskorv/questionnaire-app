import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { CreateAnswerFailure, CreateAnswerSuccess, CreateQuestionFailure, CreateQuestionSuccess, EditQuestionFailure, EditQuestionSuccess, EQuestionActions, GetDataFailure, GetDataSuccess, RemoveAnswerFailure, RemoveAnswerSuccess, RemoveQuestionFailure, RemoveQuestionSuccess } from "../actions/question.actions";
import { catchError, map, switchMap } from 'rxjs/operators';
import { InfoService } from "src/app/shared/services/info.service";
import { changeAnswer, changeQuestion, createQuestion, removeAnswer, removeQuestion } from "src/app/shared/modules/changedb";
import { IQuestion } from "src/app/shared/modules/question";

@Injectable()
export class QuestionEffects {

  getData$ = createEffect(() => this.actions$.pipe(
    ofType(EQuestionActions.GetDataAction),
    map(() =>
    {
      let forJSON = this.infoService.getData();
      try {
        const data = JSON.parse(forJSON).map((item: IQuestion) => {
          const {...object} = item;
          return object;
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
        map((data: any) => this.infoService.prototypeFunction(createQuestion, data.question) ? CreateQuestionSuccess(data) : CreateQuestionFailure()
          )
      ));
    
    editQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.EditQuestionAction),
        map((data: any) => this.infoService.prototypeFunction(changeQuestion, data.question) ? EditQuestionSuccess(data) : EditQuestionFailure()
        
          )
      ));
    
    removeQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.RemoveQuestionAction),
        map((data: any) => this.infoService.prototypeFunction(removeQuestion, data.questionId) ? RemoveQuestionSuccess(data) : RemoveQuestionFailure()
          )
      ));
    
    createAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.CreateAnswerAction),
        map((data: any) => this.infoService.prototypeFunction(changeAnswer, data.questionId, data.answer) ? CreateAnswerSuccess(data) : CreateAnswerFailure()
          )
      ));
    
    removeAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(EQuestionActions.RemoveAnswerAction),
        map((data: any) => this.infoService.prototypeFunction(removeAnswer, data.questionId) ? RemoveAnswerSuccess(data) : RemoveAnswerFailure()
          )
      ));
    
      constructor(
        private actions$: Actions,
        private infoService: InfoService
      ) {}
}