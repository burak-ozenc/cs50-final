import React from 'react'
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <nav className="navbar sticky-top bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/">CS50</Link>
                    <span className="navbar-brand  text-light">Burak Özenç</span>
                </div>
            </nav>
        </div>
    )
}

export default Header