export const getQuestions = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/real-questions');
    return await response.json();
  } catch(err) {
    throw err;
  }
}
