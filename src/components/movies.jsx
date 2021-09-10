import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends React.Component {
  state = {
    movies: getMovies(),
    count: 9
  };

  handleDelete = movie => {
      this.setState({ count: this.state.count - 1 });
      const removedMovieIndex = this.state.movies.indexOf(movie);
      this.setState({ movies: this.state.movies.filter((movie, i) => i !== removedMovieIndex)})
  }

  render() {
    return (
      <>
        {this.state.count > 0 ? <p>Showing {this.state.count} movies in the database.</p> : <p>There are no movies in the database</p>}
        <table className='table'>
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                </tr>
            </thead>
            <tbody>
            {this.state.movies.map((movie) => (
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><button type="button" className="btn btn-danger" onClick={() => this.handleDelete(movie)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
      </>
    );
  }
}

export default Movies;

