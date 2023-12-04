import React, { useContext, useState, useEffect } from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { auth } from "../googledatebase/config";
import SignOutButton from "./pages/logout";


const Navbar = ()=> {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log("current user:", user.displayName)
            setUser(user);
        });

        return () => unsubscribe();
    }, []);
    return (
        // <nav className="nav">
        //     <Link to="/" className="site-title">
        //         ShoppingAround
        //     </Link>
        //     <ul>
        //         <CustomLink to="/chat">Chat</CustomLink>
        //         <CustomLink to="/lists">Lists</CustomLink>
        //         <CustomLink to="/addastore">Add a Store</CustomLink>
        //         <CustomLink to="/signin">Sign in</CustomLink>
        //     </ul>
        // </nav>
        <div className="nav">
            <div className="container">
                <Link to="/" className="site-title">
                    ShoppingAround
                </Link>
            </div>
            <div className="nav">
                <Link className="link" to="/chat">
                    <h6>Chat</h6>
                </Link>
                <Link className="link" to="/lists">
                    <h6>Lists</h6>
                </Link>
                <Link className="link" to="/addastore">
                    <h6>Add a Store</h6>
                </Link>
            {user ? (
                <div>
                    {/* Render content for authenticated users */}
                    <p>Welcome, {user.displayName}!</p>
                <SignOutButton />
                </div>
            ) : (
                <Link to="/login">Login</Link>
            )}       
            </div>
        </div>
    )
}

function CustomLink({ to, children, ...props}) {
     const resolvedPath = useResolvedPath(to)
     const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

export default Navbar;