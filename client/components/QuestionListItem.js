import React from 'react';

import TagList from './TagList';

const QuestionListItem = ({ title, tags }) => (
  <div className='mb-3'>
    <h3>{title}</h3>

    <div className='mb-2'>
      <TagList tags={tags} />
    </div>
  </div>
);

export default QuestionListItem;
