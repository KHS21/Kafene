// import logo from './logo.svg';
import "./App.css";
// import './css/login.css';
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/loginPage/home";
import Order from "./components/orderList";
import Product from "./components/product";
import User from "./components/user";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product" element={<Product />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  // <RouterProvider router={ROUTES} />;
}

export default App;
