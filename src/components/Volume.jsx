export default function Volume({ min, max, value, step, onChange }) {
  return (
    <input
      onChange={onChange}
      min={min}
      max={max}
      value={value}
      step={step}
      className="volume"
      type="range"
    />
  );
}
