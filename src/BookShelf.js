import React, { Component } from 'react';
import BookDisplay from './BookDisplay';

class BookShelf extends Component {
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
