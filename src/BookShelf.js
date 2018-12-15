import React, { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {
 

    changedBookHandler = (id, val) => {
        console.log('in BookShelf.js ' + id + ': ' + val );
        this.props.showNewShelfArrangement(id, val);
    };
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
                                shelf={book ? book.shelf : 'none'}
                                changedBooks={(id, val) => this.changedBookHandler(id, val)}
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