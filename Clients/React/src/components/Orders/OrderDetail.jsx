import React, { Component } from "react";
import Auth from "../../utils/auth";
import {
  fetchPendingOrders,
  fetchUserOrders
} from "../../services/orderService";

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderDetail: [],
      isLoading: true
    };
  }

  componentDidMount() {
    if (Auth.isUserAdmin()) {
      fetchPendingOrders().then(orderDetail =>
        this.setState({ orderDetail, isLoading: false })
      );
    } else {
      fetchUserOrders().then(orderDetail =>
        this.setState({ orderDetail, isLoading: false })
      );
    }
  }

  render() {
    console.log(this.state.orderDetail);
    let orderId = this.props.match.params.id;
    let order = this.state.orderDetail.find(o => o._id === orderId);
    if (!order) {
      return <h2>No such order</h2>;
    }

    let totalPrice = 0;
    for (const product of order.products) {
      totalPrice += product.price;
    }

    return (
      <div className="container mt-4">
        <h1 className="text-center">Order #{orderId}</h1>
        <div className="row space-top">
          <div className="col-md-12 mt-3">
            <p>
              <span className="font-weight-bold lead text-warning">
                Products In Order:
              </span>{" "}
              <span className="ml-2 lead">{order.length}</span>
            </p>
            <p>
              <span className="font-weight-bold lead text-warning">Date:</span>{" "}
              <span className="ml-2 lead">
                {new Date(order.date).toLocaleString()}
              </span>
            </p>
            <p>
              <span className="font-weight-bold lead text-warning">
                Total Price:
              </span>{" "}
              <span className="ml-2 lead">${totalPrice.toFixed(2)}</span>
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
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((p, i) => (
                      <tr>
                        <th>#{i + 1}</th>
                        <td>{p.title}</td>
                        <td>$ {p.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;
