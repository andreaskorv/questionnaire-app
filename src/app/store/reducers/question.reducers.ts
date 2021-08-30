import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { createQuestion, changeQuestion, removeQuestion } from "src/app/shared/modules/changedb";
import { CreateAnswerSuccess, CreateQuestionSuccess, EditQuestionSuccess, GetDataSuccess, RemoveAnswerSuccess, RemoveQuestionSuccess } from "../actions/question.actions";
import { IQuestionState, initialQuestionState } from "../state/questions.state";

const reducer = createReducer(
    initialQuestionState,
    on(GetDataSuccess, (state, { data }) => {
      console.log(data);
      return data;
    }
    ),
    on(CreateQuestionSuccess, (state, { question }) => {
      console.log(question);
      return ({...state, questions: [...state.questions.slice(), question]
    })}
    ),
    on(EditQuestionSuccess, (state, { question }) => {
      console.log(question);
      return ({...state, questions: changeQuestion(state.questions.slice(), question)
    })}
    ),
    on(RemoveQuestionSuccess, (state, { question }) => ({...state, questions: removeQuestion(state.questions.slice(), question)
    })
    ),
    on(CreateAnswerSuccess, (state, { question }) => ({...state, questions: changeQuestion(state.questions.slice(), question)
    })
    ),
    on(RemoveAnswerSuccess, (state, { question }) => ({...state, questions: changeQuestion(state.questions.slice(), question)
    })
    ),
  );
   
  export function questionReducer(state: IQuestionState | undefined, action: Action) {
    return reducer(state, action);
  }