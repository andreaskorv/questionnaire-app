import { IAnswer } from "src/app/shared/modules/answer";

export interface IAnswerState {
    answers: IAnswer[];
}

export const initialAnswerState: IAnswerState = {
    answers: []
}