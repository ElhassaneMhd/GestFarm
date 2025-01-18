import { Link } from "react-router-dom";

export function Logo({ to = "/", className }) {
  const src = "src/assets/images/logo.png";
  if (to)
    return (
      <Link to={to} className={className}>
        <img src={src} alt="Logo" className="h-8" />
      </Link>
    );
  return <img src={src} alt="Logo" className={className} />;
}
