import "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <p className="error-message">
      {message || "Something went wrong. Please try again."}
    </p>
  );
}
