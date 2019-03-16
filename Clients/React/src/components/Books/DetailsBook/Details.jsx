import React, { Component } from 'react'
import BookDetails from './BookDetails'
import Auth from '../../../utils/auth'

class Details extends Component {
  
    render () {
    const bookId = this.props.match.params.id
    const bookDetais = this.props.books.find(p => p._id === bookId)
   if (!bookDetais) {
      return (
        <h2>No such order</h2>
      )
    }
       
    const username = Auth.getUsername()

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>{bookDetais.title}</h1>
          </div>
        </div>
        <BookDetails
          otherProps = {this.props}
          bookDetails={bookDetais}
          username={username}
           />
      
      </div>
    )
  }
}


export default Details;
