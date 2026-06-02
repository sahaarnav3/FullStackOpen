import {
  Card,
  CardContent,
  Typography,
  Link,
  CardActions,
  Button,
  Box,
} from '@mui/material';

const BlogDetails = ({ blog, likeHandler, deleteHandler, user }) => {
  if (!blog) return <h1>404 - Blog Not Found</h1>;
  return (
    blog && (
      <Card
        variant="outlined"
        sx={{
          maxWidth: '75%',
          borderRadius: '4px',
          borderColor: '#e0e0e0',
          boxShadow: 'none',
          marginTop: '20px',
        }}
      >
        <CardContent sx={{ pb: 1 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 500, mb: 1.5, color: '#111' }}
          >
            {blog.title}
          </Typography>

          <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
            {blog.author}
          </Typography>

          <Link
            href="reactpatterns.com"
            underline="hover"
            target="_blank"
            rel="noopener"
            sx={{ display: 'inline-block', mb: 1, color: '#1976d2' }}
          >
            {blog.url}
          </Link>

          <Typography variant="body2" sx={{ color: '#666' }}>
            Added by {blog.user.name}
          </Typography>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', color: '#111' }}
            >
              {blog.likes} likes
            </Typography>
          </Box>

          {user && (
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: '#1976d2',
                borderColor: '#b3d4fc',
                px: 2,
                '&:hover': {
                  borderColor: '#1976d2',
                  backgroundColor: '#f0f7ff',
                },
              }}
              onClick={() => likeHandler(blog)}
            >
              LIKE
            </Button>
          )}
          {user && (
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: '#f44336',
                borderColor: '#ffcdd2',
                px: 2,
                '&:hover': {
                  borderColor: '#f44336',
                  backgroundColor: '#ffebee',
                },
              }}
              onClick={() => deleteHandler(blog)}
              disabled={blog.user.username === user.username ? '' : 'disabled'}
            >
              REMOVE
            </Button>
          )}
        </CardActions>
      </Card>
    )
  );
};

export default BlogDetails;
