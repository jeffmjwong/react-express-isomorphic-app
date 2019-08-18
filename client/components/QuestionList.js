import React from 'react';
import { connect } from 'react-redux';

import QuestionListItem from './QuestionListItem';

const QuestionList = ({ questions }) => {
  return (
    <div>
      {
        questions && questions.length > 1
          ? <div>
              {
                questions.map(question => (
                  <QuestionListItem key={question.question_id} {...question} />
                ))
              }
            </div>
          : <div>
              ... Loading questions...
            </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(QuestionList);
