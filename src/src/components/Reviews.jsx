import React, { useEffect, useState } from 'react';
import { getReviews, addReview, deleteReview } from '../api';

const Reviews = ({ isAdmin }) => {
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

  const handleDelete = async (id) => {
    try {
      await deleteReview(id); // Call the API to delete the review
      setReviews(reviews.filter((review) => review.id !== id)); // Update state to remove the deleted review
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Calculate the count of each unique picker
  const pickerCounts = reviews.reduce((acc, review) => {
    const picker = review.picker.toLowerCase() || '???';
    acc[picker] = (acc[picker] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1>The Movie Picker Game!</h1>
      <form 
        onSubmit={handleSubmit} 
        style={{
          display: "grid", 
          //gridTemplateRows: "2fr 2fr 6fr 1fr", 
          minWidth: "80vw",
          marginTop: "40px",
        }}>
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

      {/* Picker counts display */}
      <div 
        style={{ 
          marginTop: '40px',
          border: "2px solid black",
          borderRadius: "10px",
          backgroundColor: "#141"
        }}
      >
        <h2
          style={{
            //borderBottom: "2px solid black",
            margin: "auto",
          }}
        >Picker Counts:</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          }}
        >
          {Object.entries(pickerCounts).map(([picker, count]) => (
            <p 
              key={picker}
              style={{
                fontSize: "22px",
              }}
            >{picker.toUpperCase()}: {count}</p>
          ))}
        </div>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: 'repeat(auto-fill, 450px)', 
        gridAutoRows: '250px', 
        justifyContent: "space-between",
        gap: "6px",
        width: '100%', 
        overflowY: 'auto', 
        margin: "2px", 
        marginTop: "40px",
        padding: "0px", 
      }}>
        {reviews.map((review) => (
          <div 
            key={review.id}
            style={{
              position: "relative",
              padding: '10px', 
              margin: '6px',
              backgroundColor: "#333",
              border: '2px solid #101', 
              borderRadius: "20px",
              fontSize: "20px"
            }}
          >
            {isAdmin && <button 
              onClick={() => handleDelete(review.id)}
              style={{
                position: "absolute",
                top: "5px",
                right: "10px",
                background: "transparent",
                border: "none",
                color: "red",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              ×
            </button>}
            <h2 
              style={{padding: 0, margin: 0}}
            >{review.title}</h2>
            <p 
              style={{color: "#1C1", padding: 0, margin: 0}}
            >{review.picker ? review.picker : "???"} Picked It</p>
            <p 
              style={{color: "#DEB", padding: 0, margin: 0}}
            >{review.content}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Reviews;
