import React from "react";
import "./css/css.css"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className='header'>
            <div className="logo">
                <img src="logo.png" alt="Logo" />
            </div>
            <div className='text'>
                <div className="home">
                    <Link to="/" className='link'>Accueil</Link>
                </div>
                <div className="inscription">
                    <Link to="/Inscription" className='link'>S'inscrire</Link>
                </div>
                <div className="about">
                    <Link to="/Contact" className='link'>Contact</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;