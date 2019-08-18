const baseUrl = `${process.env.API_URL}api/real-questions`;
const baseUrlMock = `${process.env.API_URL}api/mock-questions`;

export const getQuestions = async () => {
  try {
    const response = await fetch(baseUrl);
    return await response.json();
  } catch(err) {
    throw err;
  }
};

export const getMockQuestions = async () => {
  try {
    const response = await fetch(baseUrlMock);
    return await response.json();
  } catch(err) {
    throw err;
  }
};
