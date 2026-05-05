export default function BlogForm({
  createFormHandler,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) {
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
