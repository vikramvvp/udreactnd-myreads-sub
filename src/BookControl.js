import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BooksApp extends Component {
  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    bookDetails: PropTypes.object.isRequired
  }
  state = {
    shelf: this.props.bookDetails.shelf
  }

  shelfChange = (book, newShelf) => {
    this.props.onShelfChange(book, newShelf);
    this.setState({shelf: newShelf});
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select defaultValue={this.state.shelf} onChange={(event) => this.shelfChange(this.props.bookDetails, event.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">{this.state.shelf==='currentlyReading'?String.fromCharCode(10004):''} Currently Reading</option>
          <option value="wantToRead">{this.state.shelf==='wantToRead'?String.fromCharCode(10004):''} Want to Read</option>
          <option value="read">{this.state.shelf==='read'?String.fromCharCode(10004):''} Read</option>
          <option value="none">{this.state.shelf==='none'?String.fromCharCode(10004):''} None</option>
        </select>
      </div>
    );
  }
}

export default BooksApp;
