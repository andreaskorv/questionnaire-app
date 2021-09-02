import { ActionReducerMap } from "@ngrx/store";
import { State } from "../selectors";
import { IAppState } from "../state/app.state";
import { reducer } from "./question.reducers";

export const appReducers: ActionReducerMap<State> = {
    questions: reducer
}