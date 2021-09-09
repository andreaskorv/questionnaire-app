import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { copyObject, sort } from 'src/app/shared/modules/functions';
import { IQuestion } from 'src/app/shared/modules/question';
import * as fromQuestion from '../reducers/question.reducers';
import { EntityState } from '@ngrx/entity';


export interface State {
  questions: EntityState<Object>;
}

export const selectQuestionState = createFeatureSelector<fromQuestion.State>('questions');

const selectQuestions = createSelector(
    selectQuestionState,
    fromQuestion.selectAllQuestions
);

export const selectAllQuestions = createSelector(
  (state: IAppState) => state,
    (
        state: IAppState
    ) => {
        let forQuestions = selectQuestions(state);
        let forReturn = forQuestions.map((item) => (copyObject(item)));
        forReturn.sort(sort);
        return forReturn;
    }
)

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
    (questionEntities, questionId) => copyObject(questionEntities[questionId] as Object)
  );

export const selectCertainQuestions = createSelector(
    (state: IAppState) => state,
    (
        state: IAppState,
        isAnswered: boolean
    ) => {
        let forQuestions = selectAllQuestions(state);
        console.log(forQuestions);
        let forReturn = forQuestions.filter(
            item => Boolean(item.trueAnswer()) == isAnswered
        );
        forReturn.sort(sort);
        return forReturn;
    }
)

export const selectAnsweredQuestions = (state: IAppState) => (selectCertainQuestions(state, true));
export const selectUnansweredQuestions = (state: IAppState) => (selectCertainQuestions(state, false));