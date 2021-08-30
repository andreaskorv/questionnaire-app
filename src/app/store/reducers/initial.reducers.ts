import { Action, createReducer, on } from "@ngrx/store";
import { GetDataSuccess, } from "../actions/initial.actions";
import { IQuestionState, initialQuestionState } from "../state/questions.state";

const reducer = createReducer(
    initialQuestionState,
    on(GetDataSuccess, (state, { data }) => (data) 
    )
  );
   
  export function initialReducer(state: IQuestionState | undefined, action: Action) {
    return reducer(state, action);
  }