import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchQuestions } from '../redux/actions/questionActions';

const App = ({ questions, dispatch }) => {
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [])

  return (
    <div>
      <h2>This is an Isomorphic App with React and Express!</h2>

      {
        questions && questions.map(question => (
          <p key={question.question_id}>{ question.question_id }</p>
        ))
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

// const mapDispatchToProps = (dispatch) => ({
//   actions: {

//   }
// });

export default connect(mapStateToProps)(App);
