import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class BookShelfChanger extends Component {
  
  handleClick = (e) => {
    const val = e.target.value;
    BooksAPI.get(this.props.id)
      .then(res => BooksAPI.update(res, val))
      .then(this.props.wasChanged(this.props.id, val))
  }
  
  render() {
    return(
      <div className="book-shelf-changer">
        <select value={this.props.shelf} onChange={(e) => this.handleClick(e)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;