import React, { useEffect, useState } from 'react';
import { getReviews, addReview } from '../api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [picker, setPicker] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews();
      setReviews(data);
    };
    
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = await addReview(title, content, picker);
    setReviews([...reviews, newReview]);
    setTitle('');
    setContent('');
    setPicker('');
  };

  return (
    <div>
      <h1>The Movie Picker Game!</h1>
      <form onSubmit={handleSubmit} style={{display: "grid", gridTemplateColumns: "2fr 2fr 6fr 1fr", minWidth: "80vw"}}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie"
          required
        />
        <input
          type="text"
          value={picker}
          onChange={(e) => setPicker(e.target.value)}
          placeholder="Picker"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Review"
          required
        />
        <button type="submit">Add</button>
      </form>

      <div style={{ width: '500px', height: '500px', overflowY: 'scroll', border: '1px solid black', marginTop: '20px' }}>
        <ul style={{ display: 'grid', gap: '10px', padding: 0 }}>
          {reviews.map((review) => (
            <li key={review.id} style={{borderTop: "2px solid black", padding: '10px'}}>
              <h2 style={{padding: 0, margin: 0}}>{review.title}</h2>
              <p>{review.picker ? review.picker : "???"} Picked It</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Reviews;
