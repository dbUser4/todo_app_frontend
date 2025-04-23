import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">
        ToDo App
      </Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
        <Link className="nav-link" to="/login">
          Login
        </Link>
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
