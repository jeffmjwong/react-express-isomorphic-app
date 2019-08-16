export const realQuestionsUrl = 'https://api.stackexchange.com/2.0/questions?site=stackoverflow';
export const realQuestionUrl = (id) => (
  `https://api.stackexchange.com/2.0/questions/${id}?site=stackoverflow&filter=withbody`
);
