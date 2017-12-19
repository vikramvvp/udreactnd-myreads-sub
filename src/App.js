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
      let shelves = books.reduce((acc,book)=>{
        if (!acc.find(uniqueshelf=> (uniqueshelf === book.shelf)))
          acc.push(book.shelf);
        return acc;
      },[]);
      console.log(shelves);
      let shelfWiseBooks = shelves.reduce((acc,shelf)=>{
        acc.push({shelf, booksOnShelf: books.filter((book) => book.shelf === shelf)})
        return acc;
      },[])
      this.setState({ books: shelfWiseBooks});
      console.log(shelfWiseBooks);
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
              {this.state.books.map(shelfWithBooks=>(
                <BookShelf key={shelfWithBooks.shelf} shelfTitle={shelfWithBooks.shelf} shelfBooks={shelfWithBooks.booksOnShelf} />
              ))}
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
