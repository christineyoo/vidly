import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends React.Component {
  state = {
    movies: getMovies()
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    // const index = movies.indexOf(movie);

    if (!movie.liked) {
          movie.liked = true;
        } else {
          movie.liked = !movie.liked
        }
    this.setState({ movies });
  }

  render() {
      const { length: count } = this.state.movies;

      if (count === 0) return <p>There are no movies in the database</p>

    return (
      <>
        <p>Showing {count} movies in the database.</p>
        <table className='table'>
          {/* <thead> */}
            <tr>
              <th scope='col'>Title</th>
              <th scope='col'>Genre</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Rate</th>
            </tr>
          {/* </thead> */}

          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><i class={movie.liked ? 'fa fa-heart' : 'fa fa-heart-o'} aria-hidden="true" onClick={() => this.handleLike(movie)}></i></td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => this.handleDelete(movie)}
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
}

export default Movies;
