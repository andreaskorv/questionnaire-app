import { v4 as uuidv4 } from 'uuid';
import { IAnswer } from "./answer";

export enum EQuestionType {
    ESingleAnswer,
    EMultipleAnswers,
    EOpenAnswer
};

export class IQuestion {
    text: string;
    type: EQuestionType;
    answers: string[];
    date: string;
    truth?: IAnswer;
    id: string;

    constructor() {
        this.text = "";
        this.type = EQuestionType.ESingleAnswer;
        this.answers = [];
        this.date = new Date().toString();
        this.id = uuidv4();
    }

    addNewOption() {
        this.answers.push("");
    }

    deleteOption (i: number) {
        this.answers.splice(i, 1);
    }
}