import { useState } from 'react';
import blogService from '../services/blogs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function CreateBlogForm({
  blogs,
  setBlogs,
  setSuccessMessage,
  setErrorMessage,
  user,
}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createFormHandler = async (e) => {
    e.preventDefault();
    try {
      const blogResponse = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(blogResponse));
      setSuccessMessage(`a new blog ${title} added`);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch {
      if (!user) return setErrorMessage('Please login first to create blog');
      setErrorMessage('Blog Adding Failed');
    }
  };

  return (
    <form onSubmit={createFormHandler}>
      <h1>create new</h1>
      <div>
        <TextField
          label="title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: '50%' }}
        />
      </div>
      <div>
        <TextField
          label="author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ marginTop: '15px', width: '50%' }}
        />
      </div>
      <div>
        <TextField
          label="url"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ marginTop: '15px', width: '50%' }}
        />
      </div>
      <Button variant="contained" type="submit" sx={{ marginTop: '15px' }}>
        CREATE
      </Button>
    </form>
  );
}
