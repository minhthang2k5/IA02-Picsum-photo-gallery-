import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="shadow-sm bg-white sticky-top">
      <nav className="navbar navbar-expand container py-3">
        <NavLink to="/photos" className="navbar-brand fw-semibold text-primary">
          Picsum Gallery
        </NavLink>
        <div className="ms-auto d-flex gap-3">
          <NavLink
            to="/photos"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-semibold" : "text-muted"}`
            }
          >
            Photos
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
