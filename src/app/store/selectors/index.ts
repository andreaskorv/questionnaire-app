import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { isQuestionAnswered } from 'src/app/shared/modules/isanswered';
import { sort } from 'src/app/shared/modules/changedb';
import { IQuestion } from 'src/app/shared/modules/question';
import * as fromQuestion from '../reducers/question.reducers';
import { EntityState } from '@ngrx/entity';


export interface State {
    questions: EntityState<IQuestion>;
  }















export const selectQuestionState = createFeatureSelector<fromQuestion.State>('questions');

export const selectAllQuestions = createSelector(
    selectQuestionState,
    fromQuestion.selectAllQuestions
);

export const selectQuestionEntities = createSelector(
    selectQuestionState,
    fromQuestion.selectQuestionEntities
  );

  export const selectCertainQuestionId = createSelector(
    selectQuestionState,
    fromQuestion.getSelectedQuestionId
  );

export const selectCertainQuestion = createSelector(
    selectQuestionEntities,
    selectCertainQuestionId,
    (questionEntities, questionId) => questionEntities[questionId]
  );




export const selectCertainQuestions = createSelector(
    (state: IAppState) => state,
    (
        state: IAppState,
        isAnswered: boolean
    ) => {
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

/* export const selectCertainQuestion = createSelector(
    (state: IAppState) => state,
    (
        state: IAppState,
        id: string
    ) => {
        let forQuestions = state.questionState.questions.slice();
        let forReturn = forQuestions.filter(
            item => item.id == id
        );
        return forReturn[0];
    }
) */