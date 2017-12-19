import React, { Component } from 'react';

class BooksApp extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.bookDetails.shelf} onChange={(event) => this.props.onShelfChange(this.props.bookDetails.id, event.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BooksApp;
