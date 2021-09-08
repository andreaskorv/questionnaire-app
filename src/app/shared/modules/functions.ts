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

export function changeAnswer(questions: Object[], questionId:string, answer:any) {
    for (let question of questions) {
        if ((question as IQuestion).id == questionId) {
            (question as IQuestion).truth = answer;
            break;
        }
    }
    return questions;
}

export function removeAnswer(questions: Object[], questionId: string) {
    for (let question of questions) {
        if ((question as IQuestion).id == questionId) {
            (question as IQuestion).truth = undefined;
            break;
        }
    }
    return questions;
}

export function sort (a:any, b:any) {
    return (Date.parse((b as IQuestion).date) - Date.parse((a as IQuestion).date));
}

export function copyObject(object: Object) {
    let forReturn = new IQuestion();
          forReturn.id = (object as IQuestion).id;
          forReturn.type = (object as IQuestion).type;
          forReturn.text = (object as IQuestion).text;
          forReturn.date = (object as IQuestion).date;
          forReturn.answers = (object as IQuestion).answers;
          forReturn.truth = (object as IQuestion).truth;
          return forReturn;
}