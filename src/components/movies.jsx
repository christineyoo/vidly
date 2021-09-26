import React, { useState, useEffect } from 'react';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listGroup';
import _ from 'lodash';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageSize, setPageSize] = useState(4); //4 movies per page
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({});
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

  // useEffect acts like componentDidMount. This is where we call backend services
  useEffect(() => {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
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

  const handleSort = (path) => {
    const sortedColumn = { ...sortColumn };
    if (sortedColumn.path === path)
      sortedColumn.order = sortedColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortedColumn.path = path;
      sortedColumn.order = 'asc';
    }
    setSortColumn(sortedColumn);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1); //reset the page to 1 after clicking on a new genre
  };

  const count = movies.length;
  if (count === 0) return <p>There are no movies in the database</p>;

  //Filter, then sort, then paginate.
  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const paginatedMovies = paginate(sorted, currentPage, pageSize);

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
        <MoviesTable
          paginatedMovies={paginatedMovies}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
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
