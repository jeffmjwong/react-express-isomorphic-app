import React from 'react';

const QuestionListItem = ({ title, tags }) => (
  <div className='mb-3'>
    <h3>{title}</h3>

    <div className='mb-2'>
      {tags.join(', ')}
    </div>
  </div>
);

export default QuestionListItem;
