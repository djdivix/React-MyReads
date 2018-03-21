import React ,{Component} from 'react'



class Book extends Component
{
	state = {
	optionsState : {}	
	}

componentWillMount() {
	
	console.log("CWM State")
	console.log(this.state.optionsState)
	
	let optCopy = JSON.parse(JSON.stringify(this.state.optionsState))
	
	if(this.props.currBook.shelf != '')
		optCopy[this.props.currBook.id] = this.props.currBook.shelf
	else
		optCopy[this.props.currBook.id] = this.state.optionsState[this.props.currBook.id]
	
	this.setState((state) => ({
			optionsState : optCopy
	}))
}
	
onUpdateopt = (opt,book) => {
	let optCopy = JSON.parse(JSON.stringify(this.state.optionsState))
		
		this.state.optionsState[book.id] = opt
		
		this.setState((state) => ({
			optionsState : optCopy
		}))
		
	this.props.onUpd(opt,book)
} 
	
	render()
	{
	console.log(this.props.currBook)
    console.log(this.state.optionsState)
		return(
		
		<select onChange={(event) => this.onUpdateopt(event.target.value,this.props.currBook)} value = {this.state.optionsState[this.props.currBook.id]?this.state.optionsState[this.props.currBook.id]:''}>
								<option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
		)
	}
}
export default Book
	