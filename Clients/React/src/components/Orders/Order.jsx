import React, { Component, Fragment } from "react";
import OrderDetailsRow from "./OrderDetailsRow";
import Auth from "../../utils/auth";
import {
  fetchPendingOrders,
  fetchUserOrders
} from "../../services/orderService";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentWillMount() {
    if (Auth.isUserAdmin()) {
      fetchPendingOrders().then(orders => this.setState({ orders }));
    } else {
      fetchUserOrders().then(orders => this.setState({ orders }));
    }
  }

  render() {
    // if (Auth.isUserAdmin()) {
    //   if (this.props.pendingOrders.length === 0) {
    //     return <h3 className="text-primary">Loading...</h3>;
    //   }
    //   orders = this.props.pendingOrders;
    // } else {
    //   if (this.props.userOrders.length === 0) {
    //     return <h3 className="text-primary">Loading...</h3>;
    //   }
    //   orders = this.props.userOrders;
    // }

    // let orderId = this.props.match.params.id;
    // let order = orders.find(o => o._id === orderId);
    // if (!order) {
    //   return <h1>Not found</h1>;
    // }

    // let totalPrice = 0;
    // for (const product of order.products) {
    //   totalPrice += product.price;
    // }

    // let orders = this.state.orders.map((p, i) => (
    //   <OrderDetailsRow key={i} product={p} index={i} />
    // ));
    const orders = this.state.orders;
    console.log(orders);
    if (orders.length === 0) {
      return <h1>There are no orders</h1>;
    }

    return (
      <div className="container mt-4">
        {orders.map(order => (
          <Fragment>
            <h1 className="text-center">Order #{order._id}</h1>
            <div className="row space-top">
              <div className="col-md-12 mt-3">
                <p>
                  <span className="font-weight-bold lead text-warning">
                    Products In Order:
                  </span>{" "}
                  <span className="ml-2 lead">{order.length}</span>
                </p>
                <p>
                  <span className="font-weight-bold lead text-warning">
                    Date:
                  </span>{" "}
                  <span className="ml-2 lead">
                    {new Date(order.date).toLocaleString()}
                  </span>
                </p>
                <p>
                  <span className="font-weight-bold lead text-warning">
                    Total Price:
                  </span>{" "}
                  <span className="ml-2 lead">${order.totalPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-12" id="customer-orders">
                <div className="box">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>{orders}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    );
  }
}

export default Order;
