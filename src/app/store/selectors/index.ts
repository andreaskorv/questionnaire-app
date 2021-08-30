import { createSelector } from '@ngrx/store';
import { IQuestion } from 'src/app/shared/modules/question';
import { IAnswer } from 'src/app/shared/modules/answer';
import { IAppState } from '../state/app.state';
import { isQuestionAnswered } from 'src/app/shared/modules/isanswered';
import { sort } from 'src/app/shared/modules/changedb';

export const selectAllQuestions = (state: IAppState) => {
    //console.log(state);
    let forReturn = state.questionState.questions.slice();
    forReturn.sort(sort);
    return forReturn;};
export const selectCertainQuestions = createSelector(
    (state: IAppState) => state,
    (
        state: IAppState,
        isAnswered: boolean
    ) => {
        //console.log(state);
        let forQuestions = selectAllQuestions(state);
        let forReturn = forQuestions.filter(
            item => isQuestionAnswered(item) == isAnswered
        );
        forReturn.sort(sort);
        return forReturn;
    }
)

export const selectAnsweredQuestions = (state: IAppState) => (selectCertainQuestions(state, true));
export const selectUnansweredQuestions = (state: IAppState) => (selectCertainQuestions(state, false));

export const selectCertainQuestion = createSelector(
    (state: IAppState) => state,
    (
        state: IAppState,
        id: string
    ) => {
        //console.log(state);
        let forQuestions = state.questionState.questions.slice();
        let forReturn = forQuestions.filter(
            item => item.id == id
        );
        //console.log(forReturn);
        return forReturn[0];
    }
)