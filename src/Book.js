import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger';

class Book extends Component {

  selectBookHandler = (id,val) => {
      this.props.changedBooks(id,val);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.thumbnail})` }}></div>
            <BookShelfChanger
              id={this.props.id}
              wasChanged={(id,val) => this.selectBookHandler(id,val)}
              shelf={this.props.shelf}
            />
          </div>
        <div className="book-title">{this.props.title}</div>
        {this.props.authors ? this.props.authors.map((author, idx) => <div key={idx} className="book-authors">{author}</div>) : ''}
      </div>
    );
  }
}

export default Book;