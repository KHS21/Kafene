import { React, useState } from "react";
import "../../css/navigation.css";
import * as LocalStorage from "../../services/localstorage";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  // const [Active, setActive] = useState(false);
  const navigate = useNavigate();

  const userinfo = LocalStorage.getLS("user");
  console.log(userinfo);

  const erase = () => {
    LocalStorage.clearLS();
  };

  return (
    <div className="navigation">
      <nav id="nav">
        <div id="log-wrapper">
          <img
            id="logo-img"
            src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png"
            alt="stylist k"
          />
          <p id="logo-text">Kafene</p>
        </div>
        <Link to={"/order"} className="nav-link ">
          Orders
        </Link>
        <Link to="/product" className="nav-link ">
          Products
        </Link>
        <Link to="/user" className="nav-link">
          Users
        </Link>
        {userinfo && (
          <Link to="/" className="nav" onClick={erase}>
            Log Out
          </Link>
        )}
      </nav>
    </div>
  );
}
export default Navigation;
