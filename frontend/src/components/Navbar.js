import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    let location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotes</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/notes' ? "active" : ""}`} aria-current="page" to="/notes">Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <Link className="btn btn-outline-primary" to="/login">Login</Link>
                    <Link className="btn btn-outline-primary mx-1" to="/signup">Signup</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar