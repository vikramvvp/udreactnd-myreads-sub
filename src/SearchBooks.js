import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookDisplay from './BookDisplay';

class SearchBooks extends Component {

  // Ref: https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
  constructor(props) {
    super(props);
    this.updateQuery = this.debounce(this.updateQuery, 100);
  }

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    shelfBooks: PropTypes.array.isRequired
  }

  state = {
    query: '',
    resultBooks: [],
  }

  mapShelves = (shelfBooks, searchResults) => {
    return searchResults.map(book => {
      let shelfBookIndex = shelfBooks.findIndex(sbook => sbook.id === book.id);
      if (shelfBookIndex >= 0)
        book.shelf = shelfBooks[shelfBookIndex].shelf;
      else
        book.shelf = 'none';
      return book;
    });
  }

  // Ref: https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
  debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  updateQuery(query) {
    this.setState({ query: query.trim() });
    if (query) {
      this.props.onSearch(query)
        .then((books) => {
          if (books.length > 0) {
            let resultBooks = this.mapShelves(this.props.shelfBooks, books);
            this.setState(() => { return { resultBooks } });
          }
        })
        .catch((e) => {
          this.setState(() => { return { resultBooks: [] } });
        });
    }
  }

  componentDidMount() {
    this.updateQuery(this.state.query);
  }

  render() {
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {!this.state.resultBooks ?
            <h3>Loading</h3> :
            <ol className="books-grid">
              {this.state.resultBooks.map(book => (
                <li key={book.id}>
                  <BookDisplay onShelfChange={this.props.onShelfChange} bookDetails={book} />
                </li>))}
            </ol>
          }
        </div>
      </div>
    );
  }
}

export default SearchBooks;
