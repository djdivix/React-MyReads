 import React ,{Component} from 'react'
 import * as BooksAPI from './BooksAPI'
 import {Link} from 'react-router-dom'
 
 class  SearchBooks extends Component
 {
	state ={
		showingBooks : [],
		query : ''
	}
		
	updatequery = (q) => {
	this.setState((state) => ({
		query : q.trim()	
		})
		)
		BooksAPI.search(q.trim()).then((showingBooks)=> {this.setState({showingBooks})
	})
	}
	render()
	{
	let showBooks = this.state.showingBooks
	
	if(this.state.query)
	{
		console.log(this.state.query)
		console.log(showBooks)
		if(showBooks.error === "empty query") 
		{
			console.log("CHECK")
			showBooks = this.props.books
		}
	}
	else
	{
			showBooks = this.props.books
	}
	return(
          <div className="search-books">
            <div className="search-books-bar">
             <Link to ='/' className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
				<input type = "text" value = {this.state.query} onChange = {(event) => this.updatequery(event.target.value)} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
			  {showBooks.map(book => 
				<li key={book.id} className = 'book'>
					<div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url(${book.imageLinks.smallThumbnail})`}}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(event) => this.props.onUpdate(event.target.value,book)} value = {this.props.optState.id == book.id ? this.props.optState.opt:book.shelf}>
								{this.props.options.map(option => 
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
		)}
 }
 export default SearchBooks