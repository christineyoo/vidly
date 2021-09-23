import React, { useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';

export default function Movies() {
  const [movies, setMovies] = useState(getMovies())

  const handleDelete = (movie) => {
    const movies2 = movies.filter((m) => m._id !== movie._id);
    setMovies(movies2);
  };

  const handleLike = movie => {
    const movies2 = [...movies];
    const index = movies2.indexOf(movie);
    movies2[index] = { ...movies[index]};
    movies2[index].liked = !movies2[index].liked;
    setMovies(movies2);
    //In the future, call the backend server here too so the changes are persisted
  }

  const count = movies.length;
  if (count === 0) return <p>There are no movies in the database</p>

  return (
      <>
        <p>Showing {count} movies in the database.</p>
        <table className='table'>
            <tr>
              <th scope='col'>Title</th>
              <th scope='col'>Genre</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Rate</th>
              <th />
              <th />
            </tr>

          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like liked={movie.liked} onClick={() => handleLike(movie)}/></td>
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
      </>
    );
}
