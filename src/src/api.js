import axios from 'axios';

const API_URL = 'http://localhost:3000/reviews'

export const getReviews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addReview = async (title, content, picker) => {
  const response = await axios.post(API_URL, { title, content, picker });
  return response.data;
};