
const BlogDetails = ({ blog, likeHandler, deleteHandler, user }) => {

  return (
    blog && <div>
      <div className='blog-details'>
        <h1>{blog.title}</h1>
        <br />
        <a href={blog.url} target="_blank">{blog.url}</a>
        <div>
          likes {blog.likes}{' '}
          {user && <button onClick={() => likeHandler(blog)}>like</button>}
        </div>
        <div>Added by {blog.user.name}</div>
        {user && blog.user.username === user.username ? (
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
    </div>
  )
}

export default BlogDetails
