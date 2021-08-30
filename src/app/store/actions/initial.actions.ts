import { Action, createAction, props } from "@ngrx/store";
import { IQuestionState } from "../state/questions.state";

export enum EInitialActions {
    GetDataAction = '[Initial] Get Data',
    GetDataSuccessAction = '[Initial] Get Data Success',
    GetDataFailureAction = '[Initial] Get Data Failure'
}

export const GetData = createAction(EInitialActions.GetDataAction);

export const GetDataSuccess = createAction(EInitialActions.GetDataSuccessAction,
    props<{data : IQuestionState}>());

export const GetDataFailure = createAction(EInitialActions.GetDataFailureAction);