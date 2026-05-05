import { useState } from "react";
import blogService from "../services/blogs";

export default function BlogForm({
  blogs,
  setBlogs,
  setSuccessMessage,
  setErrorMessage,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createFormHandler = async (e) => {
    e.preventDefault();
    try {
      const blogResponse = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(blogResponse));
      setSuccessMessage(`a new blog ${title} added`);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch {
      setErrorMessage("Blog Adding Failed");
    }
  };

  return (
    <form onSubmit={createFormHandler}>
      <h1>create new</h1>
      <div>
        <label>
          title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
