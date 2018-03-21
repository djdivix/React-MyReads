 import React ,{Component} from 'react'
 import * as BooksAPI from './BooksAPI'
 import {Link} from 'react-router-dom'
 import Book from './Book'
 
  class ListBooks extends Component
 {
	render()
	{
	return(
	<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                   <ol className="books-grid">
			  {this.props.books.filter(book => book.shelf == "currentlyReading").map(book =>
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
			  {this.props.books.filter(book => book.shelf == "wantToRead").map(book =>
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
			  {this.props.books.filter(book => book.shelf == "read").map(book =>
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
              </div>
            </div>
            <div className="open-search">
              <Link to = '/search'>Add a book</Link>
            </div>
		</div>
		)
	}
 }
 export default ListBooks