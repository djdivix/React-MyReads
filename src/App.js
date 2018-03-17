import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import escapeRegExp from 'escape-string-regexp'
import { Route } from 'react-router-dom'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
	books : [],
	showingBooks : [],
	optionState : {id:"",  
				   opt:""},
    query : ''
  }

  componentDidMount() {
	BooksAPI.getAll().then((books) => {this.setState({books})
	})
}

updateOption = (opt,book) => {

		console.log(opt)
		console.log(book)
		
		BooksAPI.update(book, opt)
		console.log(BooksAPI.get(book.id))    
		BooksAPI.get(book.id).then((book) => {this.setState({book})
		})
		let optCopy = JSON.parse(JSON.stringify(this.state.optionState))
		
		optCopy.id = book.id
		optCopy.opt = opt
		
		this.setState((state) => ({
			optionState : optCopy
		}))
		BooksAPI.getAll().then((books) => {this.setState({books})
		console.log(BooksAPI.getAll())
		})
}
  
  	updatequery = (q) => {
		this.setState((state) => ({
			query : q.trim()	
			})
			)
	}

  render() {
	  
	var options = [{id : 0, value : "none", label: "Move to..."},
				   {id : 1, value : "currentlyReading", label: "Currently Reading"},
				   {id : 2,value : "wantToRead", label: "Want to Read"},
				   {id : 3,value : "read", label: "Read"},
				   {id : 4,value : "none", label: "None"}]

	if(this.state.query)
	{
		console.log(this.state.query)
		BooksAPI.search(this.state.query).then((showingBooks)=> {this.setState({showingBooks})
	})
	console.log(this.state.showingBooks)
	if(this.state.showingBooks.error === "empty query") {
		console.log("CHECK")
		this.state.showingBooks=this.state.books
		}
	}
	else
	{
		this.state.showingBooks = this.state.books
	}
	return (
      <div className="app">
       <Route path = "/search"
		render = {() => 
          (<div className="search-books">
            <div className="search-books-bar">
             <Link to ='/' className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
				<input type = "text" value = {this.state.query} onChange = {(event) => this.updatequery(event.target.value)} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
			  {this.state.showingBooks.map(book => 
				<li key={book.id} className = 'book'>
					<div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url(${book.imageLinks.smallThumbnail})`}}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(event) => this.updateOption(event.target.value,book)} value = {this.state.optionState.id == book.id ? this.state.optionState.opt:book.shelf}>
								{options.map(option => 
								<option key={option.id} value={option.value}>{option.label}</option>
								)}
                              </select>
                            </div>
                          </div>
				<div className = 'book-title'>{book.title}</div>
				<div className='book-authors'>{book.authors}</div>
				</li>
				)}
			  </ol>
            </div>
		</div>)}
        /> 
		<Route exact path = '/'
		render = {() =>
          (<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                   <ol className="books-grid">
			  {this.state.books.filter(book => book.shelf == "currentlyReading").map(book =>
				<li key={book.id} className = 'book'>
					<div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url(${book.imageLinks.smallThumbnail})`}}></div>
                            <div className="book-shelf-changer">
                               <select value="currentlyReading">
								{options.map(option => 
								<option key={option.id} value={option.value}>{option.label}</option>
								)}
                              </select>
                            </div>
                          </div>
				<div className = 'book-title'>{book.title}</div>
				<div className='book-authors'>{book.authors}</div>
				</li>
				)}
			  </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
			  {this.state.books.filter(book => book.shelf == "wantToRead").map(book =>
				<li key={book.id} className = 'book'>
					<div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url(${book.imageLinks.smallThumbnail})`}}></div>
                            <div className="book-shelf-changer">
                               <select value="wantToRead">
								{options.map(option => 
								<option key={option.id} value={option.value}>{option.label}</option>
								)}
                              </select>
                            </div>
                          </div>
				<div className = 'book-title'>{book.title}</div>
				<div className='book-authors'>{book.authors}</div>
				</li>
				)}
			  </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
			  {this.state.books.filter(book => book.shelf == "read").map(book =>
				<li key={book.id} className = 'book'>
					<div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url(${book.imageLinks.smallThumbnail})`}}></div>
                            <div className="book-shelf-changer">
                              <select value="read">
								{options.map(option => 
								<option key={option.id} value={option.value}>{option.label}</option>
								)}
                              </select>
                            </div>
                          </div>
				<div className = 'book-title'>{book.title}</div>
				<div className='book-authors'>{book.authors}</div>
				</li>
				)}
			  </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to = '/search'>Add a book</Link>
            </div>
		</div>)}
        />
      </div>
    )
  }
}
export default BooksApp
