import Alert from '@mui/material/Alert';

const ErrorNotification = ({ message }) => {
  if (message === null) return null;

  return (
    <Alert severity="error" sx={{ marginTop: '15px' }}>
      {message}
    </Alert>
  );
};

export default ErrorNotification;
