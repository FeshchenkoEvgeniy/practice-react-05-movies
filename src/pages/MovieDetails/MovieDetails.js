import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { getDetailsMovies } from 'api';
import { BackLink } from 'components/BackLink/BackLink';
import { Loader } from 'components/Loader/Loader';
import { Wrapper } from '../MovieDetails/MovieDetails.styled';
const MovieDetails = () => {
  const [detailMovies, setDetailMovies] = useState([]);
  const { movieId } = useParams();

  const location = useLocation();

  const backLinkHref = location.state?.from ?? '/movie';
  
  useEffect(() => {
    getDetailsMovies(movieId)
      .then(response => setDetailMovies(response))
      .catch(error => console.log(error));
  }, [movieId]);

  const {
    poster_path,
    title,
    overview,
    genres = [],
    vote_average = 0,
  } = detailMovies;
  return (
    <main>
      <BackLink to={backLinkHref} />
      <Wrapper>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : 'https://via.placeholder.com/250x375'
          }
          alt="movie"
          width="250px"
        />
        <h2>{title}</h2>
        </Wrapper>
        <div>
        <p>User score: {vote_average.toFixed(1)}</p>
        <div>
          <h3>Overview</h3>
          <p>{overview}</p>
          <div>
            <h3>Genres</h3>
            <ul>
              {genres.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
          </div>
        </div>
        <h2>Additional information</h2>
        <div>
        <ul>
          <li>
            <Link to="cast" state={{ ...location.state }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ ...location.state }}>
              Reviews
            </Link>
          </li>
        </ul>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
    </main>
  );
};

export default MovieDetails;
