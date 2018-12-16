import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchPage extends Component {

  handleSearch = (e) => {
      const q = e.target.value;
      this.props.onQueryBooks(q);
  };

  changedBookHandler = (id, val) => {
      this.props.handleUpdateBooks(id, val);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link 
            className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange={(e) => this.handleSearch(e)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books !== undefined 
              ? this.props.books.map((book, idx) => {
                return (
                  <li key={book ? book.id : idx}>
                    <Book
                      id={book ? book.id : idx}
                      title={book ? book.title : 'undefined'}
                      authors={(book && book.authors) ? book.authors : []}
                      thumbnail={(book && book.imageLinks) ? book.imageLinks.thumbnail : ''}
                      changedBooks={(id, val) => this.changedBookHandler(id, val)}
                      shelf={ (book && book.shelf) ? book.shelf : 'none'}
                    />
                  </li>)
                })
              : []}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;