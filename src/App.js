import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
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

  shelfChange = (selectedBook, newShelf) => {
    let tempBooks = this.state.books;
    let bookIndex = this.state.books.findIndex(book => book.id === selectedBook.id);
    console.log(selectedBook.id+','+bookIndex+','+newShelf);
    if (bookIndex !== -1) {
      tempBooks[bookIndex].shelf = newShelf;
    }
    else {
      selectedBook.shelf = newShelf;
      tempBooks.push(selectedBook);
    }
    this.setState({ books: tempBooks });
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
