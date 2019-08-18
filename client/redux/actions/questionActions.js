import * as types from './actionTypes';
import { getQuestions } from '../../api/questionApi';

export const fetchQuestionsSuccess = (questions) => ({
  type: types.FETCH_QUESTIONS_SUCCESS,
  questions,
});

export const fetchQuestions = () => (dispatch) => {
  return getQuestions()
    .then(data => {
      dispatch(fetchQuestionsSuccess(data.items))
    })
    .catch(err => {
      console.log(err.message);
      throw err;
    });
};
