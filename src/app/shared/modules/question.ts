import { FormArray, FormGroup } from '@angular/forms';
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

    loadInformation(fg:FormGroup) {
        this.text = fg.get("text")?.value;
        this.type = fg.get("type")?.value;
        this.answers = (fg.get("answers") as FormArray).controls.map(item => item.value.answer);
    }

    createPlainObject() {
        const {...object} = this;
        return object;
    }
}