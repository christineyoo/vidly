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
  const [selectedGenre, setSelectedGenre] = useState({});

  // useEffect acts like componentDidMount. This is where we call backend services
  useEffect(() => {
    const genres = [{name: 'All Genres'}, ...getGenres()]
    setMovies(getMovies());
    setGenres(genres);
  }, []);

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
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const count = movies.length;
  if (count === 0) return <p>There are no movies in the database</p>;

  const filtered = selectedGenre && selectedGenre._id
    ? movies.filter((m) => m.genre._id === selectedGenre._id)
    : movies;

  const paginatedMovies = paginate(filtered, currentPage, pageSize);

  return (
    <div className='row'>
      <div className='col-3'>
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onitemSelect={handleGenreSelect}
        />
      </div>
      <div className='col'>
        <p>Showing {filtered.length} movies in the database.</p>
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
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
