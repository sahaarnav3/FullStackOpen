import Alert from '@mui/material/Alert';

export default function SuccessNotification({ message }) {
  if (message === null) return null;

  return (
    <Alert severity="success" sx={{ marginTop: '15px' }}>
      {message}
    </Alert>
  );
}
