
import React, { useState } from 'react';
import '../component/MovieRoast.css';

const emojis = ['😂', '😮', '😡', '🤢', '🤔'];

const MovieRoast = () => {
  const [movies, setMovies] = useState([
    { 
      id: 1, 
      title: 'The Room', 
      roasts: [
        { 
          id: 1, 
          text: 'Oh hi, terrible movie!', 
          likes: 0, 
          dislikes: 0, 
          comments: [],
          reactions: {'😂': 0, '😮': 0, '😡': 0, '🤢': 0, '🤔': 0}
        }
      ] 
    },
    { 
      id: 2, 
      title: 'Cats', 
      roasts: [
        { 
          id: 1, 
          text: 'A catastrophe of feline proportions.', 
          likes: 0, 
          dislikes: 0, 
          comments: [],
          reactions: {'😂': 0, '😮': 0, '😡': 0, '🤢': 0, '🤔': 0}
        }
      ] 
    },
  ]);

  const [newMovie, setNewMovie] = useState('');
  const [newRoast, setNewRoast] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newComment, setNewComment] = useState('');

  const handleAddMovie = () => {
    if (newMovie.trim()) {
      setMovies([...movies, { id: Date.now(), title: newMovie, roasts: [] }]);
      setNewMovie('');
    }
  };

  const handleAddRoast = () => {
    if (newRoast.trim() && selectedMovie) {
      const updatedMovies = movies.map(movie => 
        movie.id === selectedMovie.id 
          ? { ...movie, roasts: [...movie.roasts, { 
              id: Date.now(), 
              text: newRoast, 
              likes: 0, 
              dislikes: 0, 
              comments: [],
              reactions: {'😂': 0, '😮': 0, '😡': 0, '🤢': 0, '🤔': 0}
            }] }
          : movie
      );
      setMovies(updatedMovies);
      setNewRoast('');
    }
  };

  const handleLikeDislike = (movieId, roastId, action) => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieId) {
        const updatedRoasts = movie.roasts.map(roast => {
          if (roast.id === roastId) {
            return { ...roast, [action]: roast[action] + 1 };
          }
          return roast;
        });
        return { ...movie, roasts: updatedRoasts };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  const handleAddComment = (movieId, roastId) => {
    if (newComment.trim()) {
      const updatedMovies = movies.map(movie => {
        if (movie.id === movieId) {
          const updatedRoasts = movie.roasts.map(roast => {
            if (roast.id === roastId) {
              return { ...roast, comments: [...roast.comments, newComment] };
            }
            return roast;
          });
          return { ...movie, roasts: updatedRoasts };
        }
        return movie;
      });
      setMovies(updatedMovies);
      setNewComment('');
    }
  };

  const handleReaction = (movieId, roastId, emoji) => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieId) {
        const updatedRoasts = movie.roasts.map(roast => {
          if (roast.id === roastId) {
            const updatedReactions = { ...roast.reactions, [emoji]: roast.reactions[emoji] + 1 };
            return { ...roast, reactions: updatedReactions };
          }
          return roast;
        });
        return { ...movie, roasts: updatedRoasts };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  return (
    <div className="movie-roast">
      <h1>🍿 Movie Roast Central 🔥</h1>
      
      <div className="add-movie">
        <input
          type="text"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          placeholder="Enter a movie title"
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>

      <div className="movie-list">
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className={`movie-card ${selectedMovie && selectedMovie.id === movie.id ? 'selected' : ''}`}
            onClick={() => setSelectedMovie(movie)}
          >
            <h2>{movie.title}</h2>
            <p>{movie.roasts.length} roasts</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="roast-section">
          <h2>Roast "{selectedMovie.title}"</h2>
          <div className="roast-list">
            {selectedMovie.roasts.map((roast) => (
              <div key={roast.id} className="roast-card">
                <p>"{roast.text}"</p>
                <div className="roast-actions">
                  <button onClick={() => handleLikeDislike(selectedMovie.id, roast.id, 'likes')}>
                    👍 {roast.likes}
                  </button>
                  <button onClick={() => handleLikeDislike(selectedMovie.id, roast.id, 'dislikes')}>
                    👎 {roast.dislikes}
                  </button>
                  {emojis.map(emoji => (
                    <button key={emoji} onClick={() => handleReaction(selectedMovie.id, roast.id, emoji)}>
                      {emoji} {roast.reactions[emoji]}
                    </button>
                  ))}
                </div>
                <div className="comments-section">
                  <h4>Comments:</h4>
                  {roast.comments.map((comment, index) => (
                    <p key={index}>{comment}</p>
                  ))}
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                  />
                  <button onClick={() => handleAddComment(selectedMovie.id, roast.id)}>Post Comment</button>
                </div>
              </div>
            ))}
          </div>
          <div className="add-roast">
            <input
              type="text"
              value={newRoast}
              onChange={(e) => setNewRoast(e.target.value)}
              placeholder="Enter your roast"
            />
            <button onClick={handleAddRoast}>Add Roast</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRoast;
