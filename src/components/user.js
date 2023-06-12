import React, { useEffect, useState } from "react";
import "../css/user.css";
import Navigation from "./loginPage/navigation";
import * as LocalStorage from "../services/localstorage";

const User = () => {
  const [users, setusers] = useState([]);
  const [search, setSearch] = useState("");

  const userinfo = LocalStorage.getLS("user");

  const fetchUserData = () => {
    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setusers(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const searchBar = (e) => {
    const { value } = e.target;
    if (value.length > 1) {
      setSearch(value);
    }
  };

  const reset = (e) => {
    setSearch("");
  };

  return (
    <div>
      <Navigation />
      {userinfo && (
        <div className="userBody">
          <div className="back">
            <h1>Users</h1>
            <div className="users">
              <form className="form-search">
                <label>
                  <input
                    className="input-search"
                    type="text"
                    name="searchTerm"
                    placeholder="Search by Name"
                    onChange={searchBar}
                  />
                </label>

                <button
                  className="reset-btn"
                  type="button"
                  onClick={reset}
                  value={search}
                >
                  Reset
                </button>
                {search.length < 1 && (
                  <span>
                    <h6>"Please enter at least 2 characters"</h6>
                  </span>
                )}
              </form>
            </div>
            <table className="table">
              <thead className="table-heading-row">
                <tr className="table-heading">
                  <th className="table-heading">ID</th>
                  <th className="table-heading">User Avatar</th>
                  <th className="table-heading">User Name</th>
                  <th className="table-heading">Date of Birth</th>
                  <th className="table-heading">Gender</th>
                  <th className="table-heading">Location</th>
                </tr>
              </thead>
              <tbody id="table-body">
                {users
                  .filter((user) => {
                    return user.fullName.toLowerCase().includes(search);
                  })
                  .map((user) => (
                    <tr className="tr" key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <img src={user.profilePic} alt="profile pic" />
                      </td>

                      <td>{user.fullName}</td>
                      <td>{user.dob}</td>
                      <td>{user.gender}</td>
                      <td>{`${user.currentCity}, ${user.currentCountry}`}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;

// import React, { useEffect, useState } from 'react';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setsearch] = useState('');

// useEffect(() => {
//   fetchUsers();
// }, []);

// const fetchUsers = () => {
//   fetch('https://fcial@cb4d020016fe6b07.mockopi.io/api/v/users')
//     .then(response => response.json())
//     .then(data => setUsers(data));
// };

// const handleSearchChange = event => {
//   setsearch(event.target.value);
// };

// const handleResetClick = () => {
//   setsearch('');
//   fetchUsers();
// };

// const filteredUsers = users.filter(user =>
//   user.fullName.toLowerCase().includes(search.toLowerCase())
// );

//   return (
//     <div>
//       <h1>User Management</h1>
//       <label htmlFor="search">Search:</label>
//       <input
//         type="text"
//         id="search"
//         value={search}
//         onChange={handleSearchChange}
//       />
//       {search.length < 2 && (
//         <div>Please enter at least 2 characters</div>
//       )}
//       <button onClick={handleResetClick}>Reset</button>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.firstName}</td>
//               <td>{user.lastName}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;
