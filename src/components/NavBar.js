import { NavLink, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IoReorderThreeOutline, IoCloseSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import logo from '../assets/logo.png';

const NavBar = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const firstLetterName = userData?.name[0];
    const [menuOpen, setMenuOpen] = useState(false);
    const { items } = useSelector((state) => state.cart);
    const totalCount = items.length

    return (
        <div>
            <nav className="navbar navbar-container bg-color-linear navbar-expand-lg d-flex justify-content-between align-items-center px-4">

                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    <IoReorderThreeOutline size={30} />
                </div>

                <div className="d-flex justidy-content-center align-items-center">
                    <img src={logo} alt="logo" width="40" height="40" className="me-2" />
                    <p>Ecommerce Website</p>
                </div>

                <div className={`nav-links gap-4 d-flex ${menuOpen ? "show" : ""}`}>
                    <span onClick={() => setMenuOpen(false)} className="text-end hide-lg">
                        <IoCloseSharp size={"20"} />
                    </span>

                    <NavLink to="/" className={({ isActive }) => `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`} onClick={() => setMenuOpen(false)}>Products</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`} onClick={() => setMenuOpen(false)}>About Us</NavLink>
                    <NavLink to="/profile" className={({ isActive }) => `text-decoration-none text-black hide-lg p-2 ${isActive ? "link-border" : ""}`} onClick={() => setMenuOpen(false)}>Profile</NavLink>
                    {userData?.isAdmin && (
                        <NavLink to="/admin" className={({ isActive }) => `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`} onClick={() => setMenuOpen(false)}>
                            Admin Page
                        </NavLink>
                    )}
                </div>

                <div className="d-flex align-items-center gap-3">

                    <Link to="/cart" className="position-relative text-black">
                        <FaShoppingCart size={22} />
                        {totalCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {totalCount}
                            </span>
                        )}
                    </Link>

                    <Link to="/profile" className="text-decoration-none profile-name bg-color d-block rounded-5 d-flex justify-content-center align-items-center text-black">
                        <h4>{firstLetterName}</h4>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
