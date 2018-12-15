import React, { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {
 
    state = {
        books: [...this.props.theseBooks]
    }

    componenetDidMount() {
        // this.setState((prevState, props)=>{
        //     return {books: []}
        // })
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.theseBooks.map((book, idx) => {
                        return (<li>
                            <Book
                                id={book ? book.id : idx}
                                title={book ? book.title : 'undefined'}
                                authors={book ? book.authors : []}
                                thumbnail={book ? book.imageLinks.thumbnail : ''}
                            />
                        </li>)
                    })}
                </ol>
                </div>
            </div>
        )
    }
};

export default BookShelf;