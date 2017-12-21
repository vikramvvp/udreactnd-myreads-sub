import React from 'react';
import PropTypes from 'prop-types'

import BookDisplay from './BookDisplay';

const BookShelf = ({ shelfTitle, shelfBooks, onShelfChange }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.map(book => (
            <li key={book.id}>
              <BookDisplay onShelfChange={onShelfChange} bookDetails={book} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  onShelfChange: PropTypes.func.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  shelfBooks: PropTypes.array.isRequired
}

export default BookShelf;
