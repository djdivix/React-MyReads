import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import escapeRegExp from 'escape-string-regexp'
import { Route } from 'react-router-dom'
import {Link} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
	books : [],
  }

componentDidMount() {
	this.getBooks()	
}

getBooks = () => {
	BooksAPI.getAll().then((books) => {this.setState({books})
	})
}

updateOption = (opt,book) => {
		BooksAPI.update(book, opt).then(() => {this.getBooks()
		})	
}

  render() 
  {  
	return (
      <div className="app">
	  
       <Route path = "/search"
		render = {() => (<SearchBooks books = {this.state.books} onUpdate = {this.updateOption}/>)}
        /> 
		
		<Route exact path = '/'
		render = {() => (<ListBooks books = {this.state.books} onUpdate = {this.updateOption}/>)}
        />
      </div>
    )
  }
}
export default BooksApp
