enum EQuestionType {
    ESingleAnswer,
    EMultipleAnswers,
    EOpenAnswer
};

export interface IQuestion {
    text: string;
    type: EQuestionType;
    answers: string[];
    truth: number[];
}