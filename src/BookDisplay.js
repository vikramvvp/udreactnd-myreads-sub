import React, { Component } from 'react';
import BookControl from './BookControl';

class BookDisplay extends Component {
  render() {
    const { bookDetails, onShelfChange } = this.props;
    const {title, authors, imageLinks} = bookDetails;
    return (
      <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks?imageLinks.thumbnail:''}")` }}></div>
        <BookControl bookDetails={bookDetails} onShelfChange={onShelfChange}/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors?authors.reduce((acc,author)=>((acc===''?'':acc + ', ') + author), ''):''}</div>
    </div>
    );
  }
}

export default BookDisplay;
