import React from 'react';
import * as BooksAPI from './BooksAPI';
import SearchPage from './SearchPage';
import BookShelf from './BookShelf';
import './App.css';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {

    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  updateBook = (bookID) => {

  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchPage 
            onClickBack={() => {
              history.push('/')
            }}
          />
        )} />
        
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                  title='Currently Reading' 
                  theseBooks={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                />
                <BookShelf 
                  title='Want to Read'
                  theseBooks={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                />
                <BookShelf 
                  title='Read'
                  theseBooks={this.state.books.filter((book) => book.shelf === 'read')}
                />
                
              </div>
            </div>
            <div className="open-search">
              {/*<button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>*/}
              <Link
                to='/search'
                className="open-search"
              >
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
