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
      <h2>This is an Isomorphic App with React and Express!</h2>

      <QuestionList questions={questions} />

      {/* <div>
        <button onClick={() => fetchQuestions()}>Fetch Real Questions</button>
        <button onClick={() => fetchMockQuestions()}>Fetch Mock Questions</button>
      </div>

      {
        questions && questions.map(question => (
          <p key={question.question_id}>{ question.question_id }</p>
        ))
      } */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

const mapDispatchToProps = {
  fetchQuestions: questionActions.fetchQuestions,
  fetchMockQuestions: questionActions.fetchMockQuestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
