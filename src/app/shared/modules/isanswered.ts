import { IQuestion, trueAnswer } from "./question";

export function isQuestionAnswered (question: IQuestion) {
    console.log(trueAnswer(question));
    return trueAnswer(question) != "";
}