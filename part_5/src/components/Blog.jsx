import { useState } from 'react'

const Blog = ({ blog, likeHandler, deleteHandler, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 5,
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        <span>
          {blog.title} {blog.author}{' '}
        </span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
        {showDetails ? (
          <div className='blog-details'>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}{' '}
              <button onClick={() => likeHandler(blog)}>like</button>
            </div>
            <div>{blog.user.name}</div>
            {blog.user.username === user.username ? (
              <button
                style={{ backgroundColor: 'pink', borderRadius: '5px' }}
                onClick={() => deleteHandler(blog)}
              >
                remove
              </button>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Blog
