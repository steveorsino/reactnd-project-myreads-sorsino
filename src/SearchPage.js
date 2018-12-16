import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchPage extends Component {


    handleSearch = (e) => {
        const q = e.target.value;
        this.props.onQueryBooks(q);
    };

    changedBookHandler = (id, val) => {
        console.log('in SearchPage.js ' + id + ': ' + val );
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input onChange={(e) => this.handleSearch(e)} type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.props.books !== undefined ? this.props.books.map((book, idx) => {
                    return (<li>
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