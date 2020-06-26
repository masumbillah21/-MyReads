import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SingleBook from './SingleBook'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
    state = { 
        query: '',
        filterBooks: [],
        currentShelf:[]
    }
    componentDidMount(){
        BooksAPI.getAll()
        .then(books => {
          const bookIds = books.map(book => ({ id: book.id, shelf: book.shelf }))
          this.setState({ currentShelf: bookIds })
        })
    }
     
    updateQuery = (query) => {
        BooksAPI.search(query)
        .then(books => books ? this.setState({filterBooks: books}) : null)
        this.setState(() => ({query}
        ))
    }
    updateBookShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
        .then(() => shelf !== 'none' ? alert(`${book.title} has been added to ${shelf}`) : null)
        .catch(() => alert("Something went wrong"))
    }
    renderSearchResult = () =>{
        const {filterBooks, query, currentShelf} = this.state

        if(query){            
            return filterBooks.error || filterBooks.length === 0
            ? <h2>No book found</h2>
            : filterBooks.map((book, index) => (                                                                                                  
                <SingleBook key={index} book={book} onUpdateBookShelf={this.updateBookShelf.bind(this)} currentShelf={currentShelf}/>             
            ))
        }else{
            return <h2>Search for book(s)</h2>
        }
    }

    

    render() {     
        const totalBooks = this.state.filterBooks.length
        return (
            <div className="search-books">
                <div className="search-books-bar">

                <Link className="close-search" to="/">Close</Link>

                <div className="search-books-input-wrapper">                    
                    <input type="text" placeholder="Search by title or author"
                        onChange={(event) => { this.updateQuery(event.target.value) }}/>
                </div>
                </div>
                <div className="search-books-results"> 
                {this.state.query && totalBooks !== 0 
                    ? <h2>Total {totalBooks} book(s) found</h2>: ''}                 
                <ol className="books-grid">
                    {/* {JSON.stringify(this.state.currentShelf)} */}
                    {this.renderSearchResult()}
                </ol>
                </div>
            </div>
        );
    }
}

export default BookSearch;