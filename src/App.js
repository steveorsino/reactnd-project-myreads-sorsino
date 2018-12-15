import React from 'react';
import * as BooksAPI from './BooksAPI';
import SearchPage from './SearchPage';
import BookShelf from './BookShelf';
import './App.css';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  updateBooks = (id, val) => {
    console.log('in App.js ' + id + ': ' + val );
    this.setState((prevState) => ({
      books: prevState.books.map((book) => {
        if (book.id === id)
          book.shelf = val;
        return book;
      })
    }))
  };

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
                  showNewShelfArrangement={(id, val) => this.updateBooks(id, val)}
                />
                <BookShelf
                  title='Want to Read'
                  theseBooks={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                  showNewShelfArrangement={(id, val) => this.updateBooks(id, val)}
                />
                <BookShelf
                  title='Read'
                  theseBooks={this.state.books.filter((book) => book.shelf === 'read')}
                  showNewShelfArrangement={(id, val) => this.updateBooks(id, val)}
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
