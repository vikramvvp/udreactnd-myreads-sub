import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';


class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  shelfChange = (selectedBook, newShelf) => {
    let tempBooks = this.state.books;
    let bookIndex = this.state.books.findIndex(book => book.id === selectedBook.id);
    if (bookIndex !== -1) {
      tempBooks[bookIndex].shelf = newShelf;
    }
    else {
      selectedBook.shelf = newShelf;
      tempBooks.push(selectedBook);
    }
    BooksAPI.update(selectedBook, newShelf).then(()=>{
      this.setState({ books: tempBooks });
    })
  }

  searchBook = (query) => {
    return BooksAPI.search(query);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf onShelfChange={this.shelfChange} shelfTitle="Currently Reading" shelfBooks={this.state.books.filter((book) => book.shelf === 'currentlyReading')} />
                <BookShelf onShelfChange={this.shelfChange} shelfTitle="Want To Read" shelfBooks={this.state.books.filter((book) => book.shelf === 'wantToRead')} />
                <BookShelf onShelfChange={this.shelfChange} shelfTitle="Read" shelfBooks={this.state.books.filter((book) => book.shelf === 'read')} />
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
              >Search</Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            shelfBooks={this.state.books}
            onShelfChange={this.shelfChange}
            onSearch={this.searchBook}
          />
        )} />
      </div>
    );
  }
}

export default BooksApp;
