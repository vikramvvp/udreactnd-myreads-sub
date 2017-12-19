import React, { Component } from 'react';
import BookControl from './BookControl';

class BookDisplay extends Component {
  render() {
    return (
      <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.bookDetails.imageLinks.thumbnail}")` }}></div>
        <BookControl bookDetails={this.props.bookDetails} onShelfChange={this.props.onShelfChange}/>
      </div>
      <div className="book-title">{this.props.bookDetails.title}</div>
      <div className="book-authors">{this.props.bookDetails.authors?this.props.bookDetails.authors.reduce((acc,author)=>((acc===''?'':acc + ', ') + author), ''):''}</div>
    </div>
    );
  }
}

export default BookDisplay;
