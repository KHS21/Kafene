import React from "react";
import "../css/order.css";
import Navigation from "./loginPage/navigation";
import * as LocalStorage from "../services/localstorage";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      New: true,
      Packed: true,
      InTransit: true,
      Delivered: true,
      userinfo: LocalStorage.getLS("user"),
    };
  }

  componentDidMount() {
    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
      .then((response) => response.json())
      .then((data) => this.setState({ orders: data }));
  }

  handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    this.setState({ [name]: checked });
  };

  render() {
    const { orders, New, Packed, InTransit, Delivered, userinfo } = this.state;

    const filteredOrders = orders.filter(
      (order) =>
        (New && order.orderStatus === "New") ||
        (Packed && order.orderStatus === "Packed") ||
        (InTransit && order.orderStatus === "InTransit") ||
        (Delivered && order.orderStatus === "Delivered")
    );

    return (
      <div>
        <Navigation />
        {userinfo && (
          <div className="OrderBody">
            <h1>Orders</h1>
            <div id="filter-order-wrapper">
              <aside id="filter-item-wrapper">
                <h3>Filters</h3>
                <div id="filter-option-wrapper">
                  <div id="order-count">Count: {filteredOrders.length}</div>
                  <label class="filter-option-label">
                    <input
                      class="filter-opt-checkbox"
                      type="checkbox"
                      name="New"
                      checked={New}
                      onChange={this.handleCheckboxChange}
                    />
                    New
                  </label>
                  <label class="filter-option-label">
                    <input
                      class="filter-opt-checkbox"
                      type="checkbox"
                      name="InTransit"
                      checked={InTransit}
                      onChange={this.handleCheckboxChange}
                    />
                    Packed
                  </label>
                  <label class="filter-option-label">
                    <input
                      class="filter-opt-checkbox"
                      type="checkbox"
                      name="Packed"
                      checked={Packed}
                      onChange={this.handleCheckboxChange}
                    />
                    InTransit
                  </label>
                  <label class="filter-option-label">
                    <input
                      class="filter-opt-checkbox"
                      type="checkbox"
                      name="Delivered"
                      checked={Delivered}
                      onChange={this.handleCheckboxChange}
                    />
                    Delivery
                  </label>
                </div>
              </aside>

              <table id="table">
                <tr class="table-heading-row">
                  <th class="table-heading">ID</th>
                  <th class="table-heading">Consumer</th>
                  <th class="table-heading">Data</th>
                  <th class="table-heading">Amount</th>
                  <th class="table-heading">Status</th>
                </tr>

                <tbody id="table-body">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="order-item-wrapper"
                      id={`${order.orderStatus}-${order.id}`}
                    >
                      <td className="table-data-fade">{order.id}</td>
                      <td className="table-data">{order.customerName}</td>
                      <td className="table-data">
                        {order.orderDate} <span>{order.orderTime}</span>
                      </td>
                      <td className="table-data-fade">${order.amount}</td>
                      <td className="table-data">{order.orderStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Order;
