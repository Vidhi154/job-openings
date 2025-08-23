import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const jobAPI = {
  searchJobs: async (skills, location = 'remote') => {
    try {
      const response = await api.post('/jobs/search', {
        skills,
        location,
        limit: 10
      });
      return response.data.jobs;
    } catch (error) {
      console.error('Job search failed:', error);
      return [];
    }
  },

  analyzeResume: async (resumeText) => {
    try {
      const response = await api.post('/resume/analyze', {
        text: resumeText
      });
      return response.data;
    } catch (error) {
      console.error('Resume analysis failed:', error);
      return { skills: [], experience: 0 };
    }
  }
};

export default api;