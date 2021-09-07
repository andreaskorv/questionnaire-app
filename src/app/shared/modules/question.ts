import { FormArray, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

export enum EQuestionType {
    ESingleAnswer,
    EMultipleAnswers,
    EOpenAnswer
};

export class IQuestion {
    text: string;
    type: string;
    answers: string[];
    date: string;
    truth?: any;
    id: string;

    constructor() {
        this.text = "";
        this.type = "0";
        this.answers = [];
        this.date = new Date().toString();
        this.id = uuidv4();
    }
}

export function loadInformation(question:IQuestion,fg:FormGroup) {
    question.text = fg.get("text")?.value;
    question.type = fg.get("type")?.value;
    question.answers = (fg.get("answers") as FormArray).controls.map(item => item.value.answer);
}

export function trueAnswer(question:IQuestion): string {
    //console.log(question.truth);
    let forReturn = "";
    if (question.truth) {
        if (question.type == "0") {
            //console.log("Primo");
            forReturn = question.answers[question.truth];
        }
        else if (question.type == "1") {
            //console.log("Secundo");
            forReturn = question.answers.slice().filter((item, index) => ((question.truth as number[]).includes(index))).reduce((sum, current) => (sum + ", " + current));
        }
        else if (question.type == "2") {
            //console.log("Tertio");
            forReturn = question.truth;
        }
    }
    //console.log(forReturn);
    return forReturn;
}