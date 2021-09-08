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
        this.questionTypes = [
            "Single answer",
            "Multiple answers",
            "Open answer"
          ];
    }

    questionTypes: string[] = [];

    getType() {
        return this.questionTypes[parseInt(this.type)];
    }

    loadInformation(fg:FormGroup) {
        this.text = fg.get("text")?.value;
        this.type = fg.get("type")?.value;
        if (fg.contains("answers")){
        this.answers = (fg.get("answers") as FormArray).controls.map(item => item.value.answer);}
    }
    
    trueAnswer(): string {
        if (this.truth) {
            if (this.type == "0") {
                return this.answers[this.truth];
            }
            else if (this.type == "1") {
                return this.answers.slice().filter((item, index) => ((this.truth as number[]).includes(index))).reduce((sum, current) => (sum + ", " + current));
            }
            else if (this.type == "2") {
                return this.truth;
            }
        }
        return "";
    }
}