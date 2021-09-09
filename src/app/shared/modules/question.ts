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
    options: string[];
    date: string;
    truth?: any;
    id: string;

    constructor() {
        this.text = "";
        this.type = "0";
        this.options = [];
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
        if (fg.contains("options")){
        this.options = (fg.get("options") as FormArray).controls.map(item => item.value.answer);}
    }
    
    trueAnswer(): string {
        if (this.truth || this.truth == 0) {
            if (this.type == "0") {
                return this.options[this.truth].toString();
            }
            else if (this.type == "1") {
                return this.options.slice().filter((item, index) => ((this.truth as number[]).includes(index))).reduce((sum, current) => (sum + ", " + current));
            }
            else if (this.type == "2") {
                return this.truth;
            }
        }
        return "";
    }
}