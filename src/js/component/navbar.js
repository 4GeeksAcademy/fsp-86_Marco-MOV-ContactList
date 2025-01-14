import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Contact Manager
                </Link>
                <div className="ml-auto">
                    <Link to="/">
                        <button className="btn btn-primary mx-2">Home</button>
                    </Link>
                    <Link to="/add-contact">
                        <button className="btn btn-primary">Add New Contact</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};