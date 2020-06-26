import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SingleBook extends Component {
    static propTypes = {
        book: PropTypes.array.isRequired,
        onUpdateBookShelf: PropTypes.func.isRequired,
        currentShelf: PropTypes.array
    }
    
    render() {
        const { book, onUpdateBookShelf, currentShelf } = this.props
        const imgThumbnail = book.imageLinks ? book.imageLinks.thumbnail : null        
        let shelf = 'none'
        if(currentShelf){
            for (let item of currentShelf) {
                if (item.id === book.id) {
                    shelf = item.shelf;
                    break;
                }
            }
        }
        const bookShelf = book.shelf ? book.shelf : shelf
        return (
            <li key={book.id}>        
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${imgThumbnail}")` }}></div>
                    <div className="book-shelf-changer">                        
                        <select onChange={event => onUpdateBookShelf(book, event.target.value)} value={bookShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        );
    }
}

export default SingleBook;