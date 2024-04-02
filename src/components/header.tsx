import AppIcon from "../assets/icon.svg";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5">
      <img src={AppIcon} alt="App Icon" />
      <nav className="flex items-center gap-5">
        <NavLink>Eventos</NavLink>
        <NavLink>Participantes</NavLink>
      </nav>
    </div>
  );
}
