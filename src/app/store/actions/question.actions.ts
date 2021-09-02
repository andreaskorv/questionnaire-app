import { createAction, props } from "@ngrx/store";
import { IQuestion } from "src/app/shared/modules/question";


export enum EQuestionActions {

    GetDataAction = '[Initial] Get Data',
    GetDataSuccessAction = '[Initial] Get Data Success',
    GetDataFailureAction = '[Initial] Get Data Failure',
    SelectQuestionAction = '[Question] Select Question',
    CreateQuestionAction = '[Question] Create Question',
    EditQuestionAction = '[Question] Edit Question',
    RemoveQuestionAction = '[Question] Remove Question',
    CreateAnswerAction = '[Answer] Create Answer',
    RemoveAnswerAction = '[Answer] Remove Answer',
    CreateQuestionSuccessAction = '[Question] Create Question Success',
    EditQuestionSuccessAction = '[Question] Edit Question Success',
    RemoveQuestionSuccessAction = '[Question] Remove Question Success',
    CreateAnswerSuccessAction = '[Answer] Create Answer Success',
    RemoveAnswerSuccessAction = '[Answer] Remove Answer Success',
    CreateQuestionFailureAction = '[Question] Create Question Failure',
    EditQuestionFailureAction = '[Question] Edit Question Failure',
    RemoveQuestionFailureAction = '[Question] Remove Question Failure',
    CreateAnswerFailureAction = '[Answer] Create Answer Failure',
    RemoveAnswerFailureAction = '[Answer] Remove Answer Failure',
}

export const GetData = createAction(EQuestionActions.GetDataAction);

export const GetDataSuccess = createAction(EQuestionActions.GetDataSuccessAction,
    props<{data : IQuestion[]}>());

export const GetDataFailure = createAction(EQuestionActions.GetDataFailureAction);

export const SelectQuestion = createAction(EQuestionActions.SelectQuestionAction,
    props<{questionId : string}>());

export const CreateQuestion = createAction(EQuestionActions.CreateQuestionAction,
    props<{question : IQuestion}>());

export const EditQuestion = createAction(EQuestionActions.EditQuestionAction,
    props<{question : IQuestion}>());

export const RemoveQuestion = createAction(EQuestionActions.RemoveQuestionAction,
    props<{question : string}>());

export const CreateAnswer = createAction(EQuestionActions.CreateAnswerAction,
    props<{question: IQuestion}>());

export const RemoveAnswer = createAction(EQuestionActions.RemoveAnswerAction,
    props<{question: IQuestion}>());

    export const CreateQuestionSuccess = createAction(EQuestionActions.CreateQuestionSuccessAction,
        props<{question : IQuestion}>());
    
    export const EditQuestionSuccess = createAction(EQuestionActions.EditQuestionSuccessAction,
        props<{question : IQuestion}>());
    
    export const RemoveQuestionSuccess = createAction(EQuestionActions.RemoveQuestionSuccessAction,
        props<{question : string}>());
    
    export const CreateAnswerSuccess = createAction(EQuestionActions.CreateAnswerSuccessAction,
        props<{question: IQuestion}>());
    
    export const RemoveAnswerSuccess = createAction(EQuestionActions.RemoveAnswerSuccessAction,
        props<{question: IQuestion}>());

        export const CreateQuestionFailure = createAction(EQuestionActions.CreateQuestionFailureAction);
        
        export const EditQuestionFailure = createAction(EQuestionActions.EditQuestionFailureAction);
        
        export const RemoveQuestionFailure = createAction(EQuestionActions.RemoveQuestionFailureAction);
        
        export const CreateAnswerFailure = createAction(EQuestionActions.CreateAnswerFailureAction);
        
        export const RemoveAnswerFailure = createAction(EQuestionActions.RemoveAnswerFailureAction);