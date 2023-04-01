import { getMovieReviews } from 'api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getMovieReviews(movieId)
      .then(response => setReviews(response.results))
      .catch(error => console.log(error));
  }, []);
  
  return (
    <section>
      <ul>
        {reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h2>{author}</h2>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Reviews;