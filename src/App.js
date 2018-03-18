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
	optionState : {id:"",  
	   opt:""}
  }

  componentDidMount() {
	BooksAPI.getAll().then((books) => {this.setState({books})
	})
}

updateOption = (opt,book) => {

		console.log(opt)
		console.log(book)
		//here Kelli - Changed 
		BooksAPI.update(book, opt).then(BooksAPI.getAll().then((books) => {this.setState({books})
		})
		)	
		
		console.log(BooksAPI.get(book.id))    
		//BooksAPI.get(book.id).then((book) => {this.setState({book})
		//})
		let optCopy = JSON.parse(JSON.stringify(this.state.optionState))
		
		optCopy.id = book.id
		optCopy.opt = opt
		
		this.setState((state) => ({
			optionState : optCopy
		}))
		//BooksAPI.getAll().then((books) => {this.setState({books})
		//console.log(BooksAPI.getAll())
		//})
}
  

  render() {
	  
	var options = [{id : 0, value : "none", label: "Move to..."},
				   {id : 1, value : "currentlyReading", label: "Currently Reading"},
				   {id : 2,value : "wantToRead", label: "Want to Read"},
				   {id : 3,value : "read", label: "Read"},
				   {id : 4,value : "none", label: "None"}]

	
	return (
      <div className="app">
	  
       <Route path = "/search"
		render = {() => (<SearchBooks books = {this.state.books} options = {options}  onUpdate = {this.updateOption} optState = {this.state.optionState}/>)}
        /> 
		
		<Route exact path = '/'
		render = {() => (<ListBooks books = {this.state.books} options = {options} />)}
        />
      </div>
    )
  }
}
export default BooksApp
