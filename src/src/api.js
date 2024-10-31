import axios from 'axios';

//const API_URL = 'http://localhost:3000/reviews'
const API_URL = 'https://movie-picker-r3fn.onrender.com/reviews'

export const getReviews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addReview = async (title, content, picker) => {
  const response = await axios.post(API_URL, { title, content, picker });
  return response.data;
};

// Delete a review by ID
export const deleteReview = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data; // Optionally return the response if needed
};
