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
		queriedBooks: []
	}

	queryBooks = (query) => {
		BooksAPI.search(query)
			.then((books) => {
				if (books !== undefined && books.length) {
					for (let i = 0; i < this.state.books.length; ++i) {
						for (let j = 0; j < books.length; ++ j) {
							if (books[j].id === this.state.books[i].id) {
								books[j].shelf = this.state.books[i].shelf;
							}
						}
					}
					this.setState(() => ({
						queriedBooks: books
					}))
				} else {
					this.setState(() => ({
						queriedBooks: []
					}))
				}
			}, reason => console.log(reason))		 
	};

	updateBooks = (id, val) => {
		this.setState((prevState) => ({
			books: prevState.books.map((book) => {
				if (book.id === id)
					book.shelf = val;
				return book;
			})
		}))
	};

	addBooks = (id, val) => {
		const books = this.state.books.filter(book => {
			return book.id === id
		});
		if (books.length) {
			this.setState((prevState) => ({
				books: prevState.books.map((book) => {
					if (book.id === id) {
						book.shelf = val;
					}
					return book;
				}),
				queriedBooks: prevState.queriedBooks.map((book) => {
					if (book.id === id) {
						book.shelf = val;
					}
					return book;
				})
			}))
		} else {
			BooksAPI.get(id)
				.then(book => {
					book.shelf = val;
					this.setState((prevState) => ({
						books: prevState.books.concat([book]),
					}))
				})
		}
	};

	clearQuery = () => {
		this.setState({queriedBooks: []})
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
							history.push('/');
						}}
						handleUpdateBooks={(id,val) => this.addBooks(id, val)}
						onQueryBooks={(query) => this.queryBooks(query)}
						books={this.state.queriedBooks}
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
							<Link
								to='/search'
								className="open-search"
								onClick={this.clearQuery}
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
