import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { auth } from "../googledatebase/config.js";
import SignOutButton from "./pages/logout.js";


const Navbar = ()=> {
    const [user, setUser] = useState(null);
    const [activeLink, setActiveLink] = useState(null);

    //---LOGIC FOR NAV BAR---
    const handleLinkClick = (index) => {
        setActiveLink(index);
    };

    //---CHECK FOR SIGNED IN USER---
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    //---NAV BAR---
    return (
        <div className="nav">
            <div className="container">
                <Link to="/" className="site-title">
                    ShoppingAround
                </Link>
            </div>
            <div className="nav">
                <Link
                    className={`link ${activeLink === 1 ? 'active' : ''}`}
                    to="/chat"
                    onClick={() => handleLinkClick(1)}
                >
                        chat
                </Link>
                <Link
                    className={`link ${activeLink === 2 ? 'active' : ''}`}
                    to="/review"
                    onClick={() => handleLinkClick(2)}
                >
                        reviews
                </Link>
                {user ? (
                    <div className="userDisplaySignout">
                        <p className="userDisplay">hello, {user.displayName}</p>
                    <SignOutButton />
                    </div>
                ) : (
                <Link
                    className={`link ${activeLink === 3 ? 'active' : ''}`}
                    to="/login"
                    onClick={() => handleLinkClick(3)}
                >
                    login
                </Link>
                )}       
            </div>
        </div>
    )
}

export default Navbar;