import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await blogService.login({ username, password });
      setUser(userResponse);
      blogService.setToken(userResponse.token);
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userResponse),
      );
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("Wrong Credentials");
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.reload();
  };

  return (
    <div>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
