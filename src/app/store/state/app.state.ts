import { IQuestionState, initialQuestionState } from "./questions.state";
import { IAnswerState, initialAnswerState } from "./answers.state";

export interface IAppState {
    questionState: IQuestionState,
    answerState: IAnswerState
}

export const initialAppState = {
    questionState: initialQuestionState,
    answerState: initialAnswerState
}