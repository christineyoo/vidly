import React, { useState, useEffect } from 'react';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listGroup';

export default function Movies() {

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageSize, setPageSize] = useState(4); //4 movies per page
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect acts like componentDidMount. This is where we call backend services
  useEffect(() => {
    setMovies(getMovies());
    setGenres(getGenres());
  });

  const handleDelete = (movie) => {
    const updatedMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(updatedMovies);
  };

  const handleLike = (movie) => {
    const updatedMovies = [...movies];
    const index = updatedMovies.indexOf(movie);
    updatedMovies[index] = { ...movies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
    setMovies(updatedMovies);
    //In the future, call the backend server here too so the changes are persisted
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    // setCurrentGenre(genre);
  };

  const count = movies.length;
  if (count === 0) return <p>There are no movies in the database</p>;

  const paginatedMovies = paginate(movies, currentPage, pageSize);

  return (
    <div className='row'>
      <div className='col-3'>
        {/* we put textProperty and valueProperty so that ListGroup can be as flexible as possible - in case an object doesn't have the .name and ._id properties. We don't want to couple ListGroup with this specific genre object type only. */}
        <ListGroup
          items={genres}
          textProperty='name'
          valueProperty='_id'
          onitemSelect={handleGenreSelect}
        />
      </div>
      <div className='col'>
        <p>Showing {count} movies in the database.</p>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Title</th>
              <th scope='col'>Genre</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Rate</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>
            {paginatedMovies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked} onClick={() => handleLike(movie)} />
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={movies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>

  );
}
