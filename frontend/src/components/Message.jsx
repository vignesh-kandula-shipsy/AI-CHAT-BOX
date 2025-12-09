export default function Message({ role, text }) {
  return (
    <div className={`message ${role}`}>
      <p>{text}</p>
    </div>
  );
}
