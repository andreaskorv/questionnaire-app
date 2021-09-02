import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, ActionReducerMap, createReducer, on } from "@ngrx/store";
import { changeQuestion, removeQuestion, sort } from "src/app/shared/modules/changedb";
import { IQuestion } from "src/app/shared/modules/question";
import { CreateAnswerSuccess, CreateQuestionSuccess, EditQuestionSuccess, GetDataSuccess, RemoveAnswerSuccess, RemoveQuestionSuccess, SelectQuestion } from "../actions/question.actions";


export interface State extends EntityState<IQuestion> {
  // additional entities state properties
  selectedQuestionId: string;
}

  export const adapter: EntityAdapter<IQuestion> = createEntityAdapter<IQuestion>({
    sortComparer: sort,
  });

  export const initialQuestionState: EntityState<IQuestion> = adapter.getInitialState({
    // additional entity state properties
    selectedQuestionId: "",
  });

  export const questionReducer = createReducer(
    initialQuestionState,
    on(GetDataSuccess, (state, { data }) => (adapter.setAll(data, state))),
    on(SelectQuestion, (state, { questionId }) => ({ ...state, selectedQuestionId: questionId })),
    on(CreateQuestionSuccess, (state, { question }) => (adapter.addOne(question, state))),
    on(EditQuestionSuccess, (state, { question }) => (adapter.setOne(question, state))),
    on(RemoveQuestionSuccess, (state, { question }) => (adapter.removeOne(question, state))),
    on(CreateAnswerSuccess, (state, { question }) => (adapter.setOne(question, state))),
    on(RemoveAnswerSuccess, (state, { question }) => (adapter.setOne(question, state))),
  );
  
  export function reducer(state: EntityState<IQuestion> | undefined, action: Action) {
    return questionReducer(state, action);
  }

  export const getSelectedQuestionId = (state: State) => state.selectedQuestionId;

  const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();
   
  // select the array of Question ids
  export const selectQuestionIds = selectIds;
   
  // select the dictionary of Question entities
  export const selectQuestionEntities = selectEntities;
   
  // select the array of Questions
  export const selectAllQuestions = selectAll;
   
  // select the total Question count
  export const selectQuestionTotal = selectTotal;