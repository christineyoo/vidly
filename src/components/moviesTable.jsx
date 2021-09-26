import React from 'react';
import Like from './common/like';

//Promoted MoviesTable from functional component to a class component bc want to add a method in that class for determining the sort order
class MoviesTable extends React.Component {
  raiseSort = (path) => {
    const sortedColumn = { ...this.props.sortColumn };
    if (sortedColumn.path === path)
      sortedColumn.order = sortedColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortedColumn.path = path;
      sortedColumn.order = 'asc';
    }
    this.props.onSort(sortedColumn);
  };

  render() {
    const { paginatedMovies, onDelete, onLike } = this.props;
    return (
      <table className='table'>
        <thead>
          <tr>
            <th onClick={() => this.raiseSort('title')} scope='col'>
              Title
            </th>
            <th onClick={() => this.raiseSort('genre.name')} scope='col'>
              Genre
            </th>
            <th onClick={() => this.raiseSort('numberInStock')} scope='col'>
              Stock
            </th>
            <th onClick={() => this.raiseSort('dailyRentalRate')} scope='col'>
              Rate
            </th>
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
                <Like liked={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => onDelete(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default MoviesTable;
