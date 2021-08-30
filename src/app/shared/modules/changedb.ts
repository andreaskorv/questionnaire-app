import { IQuestion } from "./question";

export function createQuestion(questions: IQuestion[], question: IQuestion) {
    console.log("На клинке меча руническая вязь");
    questions.push(question);
    return questions;
}

export function changeQuestion(questions: IQuestion[], question: IQuestion) {
    console.log(question);
    questions = questions.filter(item => item.id != question.id);
    questions.push(question);
    console.log(questions);
    return questions;
}

export function removeQuestion(questions: IQuestion[], question: IQuestion) {
    questions = questions.filter(item => item.id != question.id);
    console.log(questions);
    return questions;
}

export function sort (a: IQuestion, b: IQuestion) {
    return (Date.parse(b.date) - Date.parse(a.date));
}