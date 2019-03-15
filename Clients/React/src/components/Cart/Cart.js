import React, { Component } from "react"
import CarInfo from "./CartInfo"
import { Link } from "react-router-dom"
import {submitOrder } from "../../services/orderService";
import CartInfo from "./CartInfo";


class Cart extends Component {
  onCheckoutButtonClick () {
    let books = []
    for (let element of this.props.cart) {
      let product = this.props.products.find(p => p._id === element.id)
      books.push({
        id: element.id,
        title: product.title,
        price: product.price
      })
    }
    submitOrder(books)
    this.props.history.push('/orders')
  }

  render () {
    let total = 0
    let booksInCart = this.props.cart;

    for (let product of booksInCart) {
      total += product.price
    }

    let cartInfo = booksInCart.map((b, i) => (<CartInfo
      key={i}
      book={b}
      removeFromCart={this.props.removeFromCart} />))

    return (
      <div className='container'>
        <table id='cart' className='table table-hover table-condensed'>
          <thead>
            <tr>
              <th style={{ 'width': 50 }}>Product</th>
              <th style={{ 'width': 10 }}>Price</th>
              <th style={{ 'width': 10 }} />
            </tr>
          </thead>
          <tbody>
            {cartInfo}
          </tbody>
          <tfoot>
            <tr>
              <td><Link to='/store' className='btn btn-warning'><i className='fa fa-angle-left' /> Continue Shopping</Link></td>
              <td colSpan='2' className='hidden-xs' />
              <td className='hidden-xs text-center'><strong>Total ${total.toFixed(2)}</strong></td>
              {booksInCart.length > 0 && <td><button onClick={this.onCheckoutButtonClick.bind(this)} className='btn btn-success btn-block'>Checkout <i className='fa fa-angle-right' /></button></td>}
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}


export default Cart;
