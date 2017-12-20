import React, { Component } from 'react';
import PropTypes from 'prop-types'

import BookDisplay from './BookDisplay';

class BookShelf extends Component {
  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    shelfBooks: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.shelfBooks.map(book => (
              <li key={book.id}>
                <BookDisplay onShelfChange={this.props.onShelfChange} bookDetails={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
