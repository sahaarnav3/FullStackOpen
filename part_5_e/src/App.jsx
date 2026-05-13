import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import blogService from './services/blogs'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import CreateBlogForm from './components/CreateBlogForm'

import Home from './components/Home'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const match = useMatch('/blog-details/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 4000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [successMessage, errorMessage])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
    navigate('/')
  }

  const likeHandler = async (blogDetails) => {
    const requestBody = { likes: blogDetails.likes + 1 }
    const updateResponse = await blogService.update(
      requestBody,
      blogDetails.id,
    )
    if (updateResponse) {
      setBlogs(
        blogs
          .map((blog) =>
            blog.id === blogDetails.id
              ? { ...blog, likes: blogDetails.likes + 1 }
              : blog,
          )
          .sort((a, b) => b.likes - a.likes),
      )
      setSuccessMessage('Likes Updated')
    } else setErrorMessage('Likes couldn\'t be updated')
  }

  const deleteHandler = async (blogDetails) => {
    const confirm = window.confirm(
      `Remove blog ${blogDetails.title} by ${blogDetails.author}`,
    )
    if (!confirm) return
    const response = await blogService.deleteBlog(blogDetails.id)
    if (response.status === 204) {
      setBlogs(
        blogs
          .filter((blog) => blog.id !== blogDetails.id)
          .sort((a, b) => b.likes - a.likes),
      )

      navigate('/')
      setSuccessMessage('Blog Deleted')
    } else setErrorMessage('Blog couldn\'t be deleted')
  }

  return (
    <>
      <div>
        <Link style={{ padding: 5 }} to='/'>blogs</Link>
        <Link style={{ padding: 5 }} to='/create'>new blog</Link>
        {user ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <Link style={{ padding: 5 }} to='/login'>login</Link>
        )}
        <SuccessNotification message={successMessage} />
        <ErrorNotification message={errorMessage} />
      </div>

      <Routes>
        <Route path='/' element={
          <Home
            blogs={blogs}
            user={user}
            likeHandler={likeHandler}
            deleteHandler={deleteHandler}
          />} />
        <Route path='/login' element={
          <Login
            user={user}
            setUser={setUser}
            setErrorMessage={setErrorMessage}
          />} />
        <Route path='/create' element={
          <CreateBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
            user={user}
          />
        } />
        <Route path='/blog-details/:id' element={
          <BlogDetails
            blog={blog}
            likeHandler={likeHandler}
            deleteHandler={deleteHandler}
            user={user}
          />
        } />
      </Routes>
    </>
  )
}

export default App
