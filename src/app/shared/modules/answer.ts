import { IQuestion } from "./question";

export interface IAnswer {
    question: IQuestion;
    closedAnswer: number[];
    openAnswer: string;
}