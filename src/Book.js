import React ,{Component} from 'react'
 
class Book extends Component
{   
onUpdateopt = (opt,book) => {
    this.props.onUpd(opt,book)
}
    render()
    {
    console.log(this.props.currBook)
	console.log(this.props.currBook.shelf)
	
        return(
       
        <select onChange={(event) => this.onUpdateopt(event.target.value,this.props.currBook)} value = {!this.props.currBook.shelf?"Move to...":this.props.currBook.shelf}>
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