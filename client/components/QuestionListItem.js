import React from 'react';
import { Link } from 'react-router-dom';

import TagList from './TagList';

const QuestionListItem = ({ title, tags, question_id }) => (
  <div className='mb-3'>
    <h3>{title}</h3>

    <div className='mb-2'>
      <TagList tags={tags} />
    </div>

    <div>
      <Link to={`/questions/${question_id}`}>
        <button>More Info!</button>
      </Link>
    </div>
  </div>
);

export default QuestionListItem;
