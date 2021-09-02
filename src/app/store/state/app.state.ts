import { EntityState } from "@ngrx/entity";
import { IQuestion } from "src/app/shared/modules/question";
import { initialQuestionState } from "../reducers/question.reducers";

export interface IAppState {
    questionState: EntityState<IQuestion>
}

export const initialAppState = {
    questionState: initialQuestionState
}