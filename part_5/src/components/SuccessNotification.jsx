export default function SuccessNotification({ message }) {
  if (message === null) return null;

  return <p className="success">{message}</p>;
}
