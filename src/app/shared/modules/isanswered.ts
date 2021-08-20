import { IAnswer } from "./answer";
import { IQuestion } from "./question";

export function isQuestionAnswered (answers: IAnswer[], question: IQuestion) {
    for (let answer of answers) {
        if (answer.question == question) {
            return true;
        }
    }
    return false;
}