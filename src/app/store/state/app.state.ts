import { IQuestionState, initialQuestionState } from "./questions.state";

export interface IAppState {
    questionState: IQuestionState
}

export const initialAppState = {
    questionState: initialQuestionState
}