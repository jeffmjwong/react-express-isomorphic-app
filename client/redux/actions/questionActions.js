import * as types from './actionTypes';
import { getQuestions, getMockQuestions, getQuestion } from '../../api/questionApi';

export const fetchQuestionsSuccess = (questions) => ({
  type: types.FETCH_QUESTIONS_SUCCESS,
  questions,
});

export const fetchQuestionSuccess = (question) => ({
  type: types.FETCH_QUESTION_SUCCESS,
  question,
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

export const fetchMockQuestions = () => (dispatch) => {
  return getMockQuestions()
    .then(data => {
      dispatch(fetchQuestionsSuccess(data.items))
    })
    .catch(err => {
      console.log(err.message);
      throw err;
    });
};

export const fetchQuestion = (id) => (dispatch) => {
  return getQuestion(id)
    .then(data => {
      dispatch(fetchQuestionSuccess(data.items[0]))
    })
    .catch(err => {
      console.log(err.message);
      throw err;
    });
};
