import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as questionActions from '../redux/actions/questionActions';
import QuestionList from './QuestionList';

const App = ({ questions, fetchQuestions, fetchMockQuestions }) => {
  useEffect(() => {
    fetchQuestions();
  }, [])

  return (
    <div>
      <h1 className='mb-5'>This is an Isomorphic App with React and Express!</h1>

      <div>
        <QuestionList />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  fetchQuestions: questionActions.fetchQuestions,
  fetchMockQuestions: questionActions.fetchMockQuestions,
};

export default connect(null, mapDispatchToProps)(App);
