import React ,{Component} from 'react'
 
 
 
class Book extends Component
{
    state = {
    optionsState : []  
    }
 
componentWillMount() {
   
    console.log("CWM State")
    //console.log(this.state.optionsState)
   
   
    if(this.props.currBook.shelf != '')
    {
        //this.state.optionsState.push({id:this.props.currBook.id , myshelf:this.props.currBook.shelf});
		//console.log(this.state.optionsState)
		
	let optCopy = JSON.parse(JSON.stringify(this.state.optionsState))

	optCopy.concat({id:this.props.currBook.id , myshelf:this.props.currBook.shelf})

	this.setState((state) => ({
			optionsState : optCopy
	}))
		
		//this.setState(state => ({
		//	optionsState: this.state.optionsState.concat({id:this.props.currBook.id , myshelf:this.props.currBook.shelf})
		//	}))

		console.log(this.state.optionsState)
    }
    else
	{
		//var index = this.state.optionsState.indexOf({id:this.props.currBook.id ,myshelf:this.state.optionsState.myshelf})
		var tempshelf =  this.state.optionsState.filter(loop => loop.id == this.props.currBook.id)[0].myshelf
		console.log(tempshelf)
        //this.state.optionsState.push({id: this.props.currBook.id ,myshelf:tempshelf})
		this.setState({ 
		optionsState: this.state.optionsState.concat({id: this.props.currBook.id ,myshelf:tempshelf})
		})
	}
   
   // this.setState((state) => ({
     //       optionsState : this.state.optionsState
    //}))
}
   
onUpdateopt = (opt,book) => {
       
        var index = this.state.optionsState.indexOf({id:book.id,myshelf:opt})
        if (index > -1) {
        this.state.optionsState.splice(index, 1);
    }
       
        this.state.optionsState.push({id:book.id,myshelf:opt});
       
        this.setState((state) => ({
            optionsState : this.state.optionsState
        }))
       
    this.props.onUpd(opt,book)
}
   
    render()
    {
    console.log(this.props.currBook)
    console.log(this.state.optionsState)
	/*let selectval = ''
	for( var i in this.state.optionsState)
	{
		if(i.myshelf!=null){
		console.log(i.myshelf)
		if(i.id == this.props.currBook.id)
		{
			selectval = i.myshelf
		}
	}}
	*/
	console.log(this.state.optionsState.filter(loop => loop.id == this.props.currBook.id)[0].myshelf)
	
        return(
       
        <select onChange={(event) => this.onUpdateopt(event.target.value,this.props.currBook)} value = {this.state.optionsState.filter(loop => loop.id == this.props.currBook.id)[0].myshelf}>
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