import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserContext } from "../../App";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header-container">
            <div className="navbar">
                <div className="logo">
                    <h1>Riding <span>Hero</span></h1>
                </div>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/destination/001">Destination</Link>
                            </li>
                            <li>
                                <Link to="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li className="last">
                                <Link className="login" to="/login">Login</Link>
                            </li>
                            <li style={{color:'red', fontWeight:'bold'}}>{loggedInUser.name}</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;