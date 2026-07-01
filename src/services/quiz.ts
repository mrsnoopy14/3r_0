import api from './api';

export const quizService = {
  start: async () => {
    const response = await api.get('/api/v1/quiz/start');
    return response.data.data || response.data;
  },

  submit: async (questionId: string, selectedAnswer: string) => {
    const response = await api.post('/api/v1/quiz/submit', { questionId, selectedAnswer });
    return response.data.data || response.data;
  },

  quit: async () => {
    await api.delete('/api/v1/quiz/quit');
  },
};
