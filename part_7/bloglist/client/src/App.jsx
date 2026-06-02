import { useState, useEffect } from 'react';
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom';
import {
  Container,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import {
  useNotificationData,
  useNotificationActions,
} from './stores/NotificationStore';

import BlogDetails from './components/BlogDetails';
import CreateBlogForm from './components/CreateBlogForm';
import FallbackComponent from './components/FallbackComponent';
import Home from './components/Home';
import Login from './components/Login';
import Notification from './components/Notification';

import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { message, severity } = useNotificationData();
  const { setNotificationMessage } = useNotificationActions();

  const match = useMatch('/blog-details/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    navigate('/');
    window.location.reload();
  };

  const likeHandler = async (blogDetails) => {
    const requestBody = { likes: blogDetails.likes + 1 };
    const updateResponse = await blogService.update(
      requestBody,
      blogDetails.id
    );
    if (updateResponse) {
      setBlogs(
        blogs
          .map((blog) =>
            blog.id === blogDetails.id
              ? { ...blog, likes: blogDetails.likes + 1 }
              : blog
          )
          .sort((a, b) => b.likes - a.likes)
      );
      setNotificationMessage('Likes Updated', 'success');
    } else setNotificationMessage("Likes couldn't be updated");
  };

  const deleteHandler = async (blogDetails) => {
    const confirm = window.confirm(
      `Remove blog ${blogDetails.title} by ${blogDetails.author}`
    );
    if (!confirm) return;
    const response = await blogService.deleteBlog(blogDetails.id);
    if (response.status === 204) {
      setBlogs(
        blogs
          .filter((blog) => blog.id !== blogDetails.id)
          .sort((a, b) => b.likes - a.likes)
      );

      navigate('/');
      setNotificationMessage('Blog Deleted', 'success');
    } else setNotificationMessage("Blog can't be deleted", 'error');
  };

  return (
    <Container>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Blog App
              </Typography>
              <Button color="inherit" sx={{ fontSize: '16px' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  BLOGS
                </Link>
              </Button>
              <Button color="inherit" sx={{ fontSize: '16px' }}>
                <Link
                  to="/create"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  NEW BLOG
                </Link>
              </Button>
              {user ? (
                <Button
                  color="inherit"
                  onClick={() => handleLogout()}
                  sx={{ fontSize: '16px' }}
                >
                  LOGOUT
                </Button>
              ) : (
                <Button color="inherit" sx={{ fontSize: '16px' }}>
                  <Link
                    to="/login"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    LOGIN
                  </Link>
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <Notification />
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  blogs={blogs}
                  user={user}
                  likeHandler={likeHandler}
                  deleteHandler={deleteHandler}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/create"
              element={
                <CreateBlogForm
                  blogs={blogs}
                  setBlogs={setBlogs}
                  user={user}
                />
              }
            />
            <Route
              path="/blog-details/:id"
              element={
                <BlogDetails
                  blog={blog}
                  likeHandler={likeHandler}
                  deleteHandler={deleteHandler}
                  user={user}
                />
              }
            />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </ErrorBoundary>
      </>
    </Container>
  );
};

export default App;
