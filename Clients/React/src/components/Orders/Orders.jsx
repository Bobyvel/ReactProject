import React, { Component } from "react";
import Auth from "../../utils/auth";
import {
  approveOrder,
  fetchPendingOrders,
  fetchUserOrders
} from "../../services/orderService";
import OrdersInfo from "./OrdersInfo";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: true
    };
    this.onApproveButtonClick = this.onApproveButtonClick.bind(this);
  }

  componentDidMount() {
    if (Auth.isUserAdmin()) {
      fetchPendingOrders().then(orders =>
        this.setState({ orders, isLoading: false })
      );
    } else {
      fetchUserOrders().then(orders =>
        this.setState({ orders, isLoading: false })
      );
    }
  }

  async onApproveButtonClick(id) {
    await approveOrder(id);
    this.componentDidMount();
    
  }


  render() {
    if (this.state.isLoading) {
      return <h3 className="text-primary">Loading...</h3>;
    }

    let orders = [];
    let heading = "";
    let noOrdersMessage = "";
    const isAdmin = Auth.isUserAdmin();
    if (isAdmin) {
      orders = this.state.orders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((o, i) => (
          <OrdersInfo
            key={o._id}
            order={o}
            index={i}
            onApprove={this.onApproveButtonClick}
          />
        ));
      heading = "Pending Orders";
      noOrdersMessage = "There are currently no pending orders!";
    } else {
      orders = this.state.orders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((o, i) => <OrdersInfo key={o._id} order={o} index={i} />);
      heading = "My Orders";
      noOrdersMessage = "You have not made any orders!";
    }
    return (
      <div className="container" style={{ paddingTop: 25 }}>
        <h1 className="text-center">{heading}</h1>
        <div className="row" style={{ paddingTop: 25 }}>
          <div className="col-md-12" id="customer-orders">
            <div className="box">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>View</th>
                      {isAdmin && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>{orders}</tbody>
                </table>

                {orders.length === 0 && (
                  <h3 className="text-warning">{noOrdersMessage}</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;
