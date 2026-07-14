import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "../store";

import Blog from "./Blog";
import Notification from "./Notification";
import LoginForm from "./LoginForm";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import loginService from "../services/login";
import blogService from "../services/blogs";

const UserList = ({ users }) => {
  console.log(users);
  return (
    <div>
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
