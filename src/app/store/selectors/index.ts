import { createSelector } from '@ngrx/store';
import { IQuestion } from 'src/app/shared/modules/question';
import { IAnswer } from 'src/app/shared/modules/answer';
import { IAppState } from '../state/app.state';
import { state } from '@angular/animations';
import { isQuestionAnswered } from 'src/app/shared/modules/isanswered';

export const selectAllQuestions = (state: IAppState) => (state.questionState.questions);
export const selectAllAnswers = (state: IAppState) => (state.answerState.answers);
export const selectCertainQuestions = createSelector(
    (state: IAppState) => state,
    (
        state: IAppState,
        isAnswered: boolean
    ) => {
        let forQuestions = selectAllQuestions(state);
        let forAnswers = selectAllAnswers(state);
        let forReturn = forQuestions.filter(
            item => isQuestionAnswered(forAnswers, item) == isAnswered
        );
        return forReturn;
    }
)

export const selectAnsweredQuestions = (state: IAppState) => (selectCertainQuestions(state, true));
export const selectUnansweredQuestions = (state: IAppState) => (selectCertainQuestions(state, false));