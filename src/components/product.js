import React from "react";
import Navigation from "./loginPage/navigation";
import * as LocalStorage from "../services/localstorage";
import "../css/order.css";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      expired: true,
      lowStock: true,
      userinfo: LocalStorage.getLS("user"),
    };
  }

  componentDidMount() {
    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  }

  handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    this.setState({ [name]: checked });
  };

  render() {
    const { products, expired, lowStock, userinfo } = this.state;
    const currentDate = new Date("12-Jun-2023");
    const filteredProducts = products.filter(
      (product) =>
        (expired && product.expiryDate < currentDate) ||
        (lowStock && product.stock < 100)
    );
    return (
      <div>
        <Navigation />
        {userinfo && (
          <div className="OrderBody">
            <h1>Product</h1>
            <div id="filter-order-wrapper">
              <aside id="filter-item-wrapper">
                <h3>Filters</h3>
                <div id="filter-option-wrapper">
                  <div id="order-count">Count: {filteredProducts.length}</div>
                  <label class="filter-option-label">
                    <input
                      class="filter-opt-checkbox"
                      type="checkbox"
                      name="expired"
                      checked={expired}
                      onChange={this.handleCheckboxChange}
                    />
                    Expired
                  </label>
                  <label class="filter-option-label">
                    <input
                      class="filter-opt-checkbox"
                      type="checkbox"
                      name="lowStock"
                      checked={lowStock}
                      onChange={this.handleCheckboxChange}
                    />
                    Low Stock
                  </label>
                </div>
              </aside>
              <table id="table">
                <tr class="table-heading-row">
                  <th class="table-heading">ID</th>
                  <th class="table-heading">Product Name</th>
                  <th class="table-heading">Product Brand</th>
                  <th class="table-heading">Expiry Date</th>
                  <th class="table-heading">Unit Price</th>
                  <th class="table-heading">Stock</th>
                </tr>
                <tbody id="table-body">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="order-item-wrapper"
                      id={`${product.productStatus}-${product.id}`}
                    >
                      <td className="table-data">{product.id}</td>
                      <td className="table-data">{product.medicineName}</td>
                      <td className="table-data">{product.medicineBrand}</td>
                      <td className="table-data">{product.expiryDate}</td>
                      <td className="table-data">${product.unitPrice}</td>
                      <td className="table-data">{product.stock}</td>
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

export default Product;
