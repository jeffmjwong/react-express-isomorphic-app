import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// import * as questionActions from '../redux/actions/questionActions';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';

const App = () => {
  // useEffect(() => {
  //   fetchQuestions();
  // }, [])

  return (
    <div>
      <h1 className='mb-5'>
        <Link to='/'>
          This is an Isomorphic App with React and Express!
        </Link>
      </h1>

      <div>
        <Route exact path='/' component={QuestionList} />
        <Route exact path='/questions/:id' render={({ match }) => <QuestionDetail question_id={match.params.id} />} />
      </div>
    </div>
  );
};

// const mapDispatchToProps = {
//   fetchQuestions: questionActions.fetchQuestions,
//   fetchMockQuestions: questionActions.fetchMockQuestions,
// };

// export default connect(null, mapDispatchToProps)(App);
export default App;
