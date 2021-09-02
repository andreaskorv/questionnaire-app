import { IQuestion } from "./question";

export function createQuestion(questions: Object[], question: Object) {
    questions.push(question);
    return questions;
}

export function changeQuestion(questions: Object[], question: Object) {
    questions = questions.filter(item => (item as IQuestion).id != (question as IQuestion).id);
    questions.push(question);
    return questions;
}

export function removeQuestion(questions: Object[], question: string) {
    questions = questions.filter(item => (item as IQuestion).id != question);
    return questions;
}

export function sort (a:any, b:any) {
    return (Date.parse((b as IQuestion).date) - Date.parse((a as IQuestion).date));
}