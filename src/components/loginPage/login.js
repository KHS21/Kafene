import React, { useEffect, useState } from "react";
import "../../css/login.css";
import * as LocalStorage from "../../services/localstorage";
import { useNavigate } from "react-router-dom";

const initalValues = {
  username: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(initalValues);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.username === values.password) {
      sessionStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      alert("Login Successful");
      navigate("/order");
    } else {
      alert("User Name and Password should be same");
    }
    const data = {
      username: values.username,
      password: values.password,
    };
    LocalStorage.setLS("user", data);
  };

  return (
    <div id="loging" className="login">
      <section id="form-section">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="form-heading">Sign In</h1>
          <input
            type="text"
            placeholder="Enter Username"
            className="form-input"
            autoFocus
            name="username"
            onChange={onInputChange}
            value={values.username}
          ></input>

          <input
            className="form-input"
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={onInputChange}
            value={values.password}
          ></input>

          <button className="form-btn" type="submit" value="LogIn">
            login
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;

// import React, { useState, useEffect } from 'react';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
//     if (storedIsLoggedIn === 'true') {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (username === password) {
//       sessionStorage.setItem('isLoggedIn', 'true');
//       setIsLoggedIn(true);
//       alert('Login Successful');
//       // Redirect to orders page using React Router or any other method
//     } else {
//       alert('Please enter valid credentials!');
//     }
//   };

//   if (isLoggedIn) {
//     // Render the logged-in state or redirect to the orders page
//     return <div>You are already logged in. Redirecting...</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={username}
//         onChange={handleUsernameChange}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={handlePasswordChange}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
