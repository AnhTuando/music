export default function Button({ children, onClick }) {
  return (
    <div className="button text-light fs-3" onClick={onClick}>
      {children}
    </div>
  );
}
