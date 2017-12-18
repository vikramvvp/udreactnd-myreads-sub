import React, { Component } from 'react';
import './App.css';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      //console.log(books);
      this.setState({ books });
    })
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf shelfTitle="Currently Reading" shelfBooks={this.state.books.filter((book) => book.shelf === 'currentlyReading')} />
              <BookShelf shelfTitle="Want To Read" shelfBooks={this.state.books.filter((book) => book.shelf === 'wantToRead')} />
              <BookShelf shelfTitle="Read" shelfBooks={this.state.books.filter((book) => book.shelf === 'read')} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
          </div>
        </div>

      </div>
    );
  }
}

export default BooksApp;
