import React, { Component } from 'react' 
import './App.css'
import BookSearch from './BookSearch'
import BookLists from './BookLists'
import { Route } from 'react-router-dom'

class BooksApp extends Component {

  render() {
    return (      
      <div className="app">
        <Route exact path="/" render={() => (          
          <BookLists />
        )}/>

        <Route path="/search" render={() => (
          <BookSearch/>
        )}/>   
          

      </div>
    )
  }
}

export default BooksApp
