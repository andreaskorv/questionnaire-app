import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { questionReducer } from "./question.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
    questionState: questionReducer
}