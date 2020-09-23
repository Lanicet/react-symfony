import React, { useContext } from "react";
import AuthAPI from "../services/authAPI";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes désormais déconnecté 😁");
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        SymReact !
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink></li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/users">
            users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/posts">
            posts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/new">
            new
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {(!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Sign
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="btn btn-success">
                  Login !
                </NavLink>
              </li>
            </>
          )) || (
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
