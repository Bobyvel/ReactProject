import React, { Component } from 'react'

class CartInfo extends Component {
  constructor (props) {
    super(props)

    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this)
  }

  onDeleteButtonClick () {
    this.props.removeFromCart(this.props.book._id)
  }

  render () {
    console.log(this.props)
    const {image, title, genres, price} = this.props.book
     return (
      
      <tr>
        <td data-th='Product'>
          <div className='row'>
            <div className='col-sm-4 hidden-xs'><img src={image} alt='...' className='cart-image' /></div>
            <div className='col-sm-8'>
              <h4 className='nomargin'>{title}</h4>
              <p>{genres.join(', ')}</p>
            </div>
          </div>
        </td>
        <td data-th='Price'>${price}</td>
        <td className='actions' data-th=''>
          <button className='btn btn-danger btn-sm' onClick={this.onDeleteButtonClick}>Remove</button>
        </td>
      </tr>
    )
  }
}

export default CartInfo;
