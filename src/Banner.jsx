export default function Banner({ title, description, gradient = 1 }) {
  return (
    <div className={`bg-gradient-${gradient} p-3`}>
      <div className="display-1 text-center">{title}</div>
      <p className="text-center lead">{description}</p>
    </div>
  );
}
