export default function Notification({ message }) {
  if (message === null) return null;

  return <p className="success">{message}</p>;
}
