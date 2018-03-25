import React, { Component } from 'react'

class Book extends Component {
  onUpdateopt = (opt, book) => {
    this.props.onUpd(opt, book)
  }
  render() {
  // console.log(this.props.currBook)
   // console.log(!this.props.currBook.shelf ? 'none' : this.props.currBook.shelf)
    var selectval = !this.props.currBook.shelf ? 'none' : this.props.currBook.shelf

    return (
      <select onChange={(event) => this.onUpdateopt(event.target.value, this.props.currBook)} value={selectval}>
        <option value="none1" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}
export default Book
