 import React ,{Component} from 'react'
 import * as BooksAPI from './BooksAPI'
 import {Link} from 'react-router-dom'
 import Book from './Book'
 
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

	BooksAPI.search(q.trim(), 20).then(showingBooks => {

    this.props.books.forEach((book) => {

    let tempBook = showingBooks.find((result) => result.id === book.id)
    if (tempBook) {
      tempBook.shelf = book.shelf
    }
  })

  this.setState({ showingBooks })  
})
	
	}
	
	render()
	{
	let showBooks = this.state.showingBooks
	console.log(showBooks)
	if(this.state.query=='')
	{
		showBooks = []
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
                              <Book currBook = {book} onUpd = {this.props.onUpdate}/>
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