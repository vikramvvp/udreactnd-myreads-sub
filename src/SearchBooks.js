import React, { Component } from 'react';
import BookDisplay from './BookDisplay';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  state = {
    query: '',
    shelfBooks:this.props.shelfBooks,
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

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    console.log('query: ' + query);
    if (query) {
      this.props.onSearch(query)
        .then((books) => {
          if (books.length > 0) {
            this.setState(()=>{return {shelfBooks:this.props.shelfBooks}});
            let resultBooks = this.mapShelves(this.state.shelfBooks, books);
            this.setState(()=>{return {resultBooks}});
          }
        })
        .catch((e)=>{
          this.setState(()=>{return {resultBooks: []}});
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
          <h3>Loading</h3>:
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
