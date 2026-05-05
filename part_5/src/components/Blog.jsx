import { useState } from "react";

const Blog = ({ blog, likeHandler }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        <span>
          {blog.title} {blog.author}{" "}
        </span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
        {showDetails ? (
          <div>
            <div>{blog.url}</div>
            <div>
              {blog.likes}{" "}
              <button onClick={() => likeHandler(blog)}>like</button>
            </div>
            <div>{blog.user.name}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Blog;
