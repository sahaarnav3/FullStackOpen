import { useState } from 'react';
import blogService from '../services/blogs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNotificationActions } from '../stores/NotificationStore';
import { useBloglistActions } from '../stores/bloglistStore';

export default function CreateBlogForm({ user }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const { setNotificationMessage } = useNotificationActions();
  const { addNewBlog } = useBloglistActions();

  const createFormHandler = async (e) => {
    e.preventDefault();
    if (!user)
      return setNotificationMessage(
        'Please login first to create blog',
        'error'
      );
    try {
      if (addNewBlog({ title, author, url }))
        setNotificationMessage(`a new blog ${title} added`, 'success');
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch {
      setNotificationMessage('Blog Adding Failed', 'error');
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
