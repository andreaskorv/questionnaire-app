import { IQuestion } from "./question";

export function isQuestionAnswered (question: IQuestion) {
    return question.truth != undefined;
}