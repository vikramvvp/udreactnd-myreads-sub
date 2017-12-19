import React, { Component } from 'react';
import BookDisplay from './BookDisplay';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  state = {
    query: '',
    resultBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { query } = this.state;
    const { shelfBooks, onSearch } = this.props;
    if (query) {
      onSearch(query).then((books) => {
        console.log(books);
        let resultBooks = books.map(book => {
          let shelfBookIndex = shelfBooks.findIndex(sbook => sbook.id === book.id);
          if (shelfBookIndex >= 0)
            book.shelf = shelfBooks[shelfBookIndex].shelf;
          return book;
        });
        this.setState({resultBooks});
      });
    }
    
  }

  componentDidMount() {
    
  }

  render() {
    const { query } = this.state;

    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link className='close-search' to='/'>Close</Link>
        <form onSubmit={this.handleSubmit}>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {this.state.resultBooks.map(book => (
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

export default SearchBooks;
