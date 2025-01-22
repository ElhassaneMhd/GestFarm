import { Link } from "react-router-dom";
import { Sheep } from "./Sheep";

export function Logo({ to = "/", className }) {
  to && (
    <Link to={to} className={" flex justify-start items-center" + className}>
      <Sheep size="lg" />
      <span className=" font-extrabold">Baa3</span>
    </Link>
  );
  return <Sheep size="lg" />;
}
