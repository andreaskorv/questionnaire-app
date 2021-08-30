import { IQuestion } from "./question";

export function createQuestion(questions: IQuestion[], question: IQuestion) {
    questions.push(question);
    return questions;
}

export function changeQuestion(questions: IQuestion[], question: IQuestion) {
    questions = questions.filter(item => item.id != question.id);
    questions.push(question);
    return questions;
}

export function removeQuestion(questions: IQuestion[], question: string) {
    questions = questions.filter(item => item.id != question);
    return questions;
}

export function sort (a: IQuestion, b: IQuestion) {
    return (Date.parse(b.date) - Date.parse(a.date));
}