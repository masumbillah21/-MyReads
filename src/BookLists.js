import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SingleBook from './SingleBook'

class BookLists extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
  
    }
    componentDidMount(){
      this.getBooks()
    }
  
    getBooks = () => {
      BooksAPI.getAll()
      .then((allBooks)=>{
        const matchCurrectlyReading = 'currentlyReading'
        let currentlyReading = allBooks ? allBooks.filter(book => matchCurrectlyReading === book.shelf) : null
  
        const matchWantToRead = 'wantToRead'
        let wantToRead = allBooks ? allBooks.filter(book => matchWantToRead === book.shelf) : null
  
        const matchRead = 'read'
        let read = allBooks ? allBooks.filter(book => matchRead === book.shelf) : null
        this.setState(()=>({
          currentlyReading,
          wantToRead,
          read
        }))
      })
  
    }
  
   updateBookShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then(() => this.getBooks());
  }

    renderShelf = (books=[], title) => {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">                    
                    { books.length !== 0
                    ? books.map((book, index) => (                                 
                        <SingleBook key={index} book={book} onUpdateBookShelf={this.updateBookShelf}/>                       
                    ))
                    : <h2>There is no book in this self</h2>}          
                </ol>
                </div>
            </div>
        )
    }
    render() {
        const { currentlyReading, wantToRead, read } = this.state
        
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>                
                {this.renderShelf(currentlyReading, 'Currently Reading')}
                {this.renderShelf(wantToRead, 'Want to Read')}
                {this.renderShelf(read, 'Read')}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        );
    }
}

export default BookLists;