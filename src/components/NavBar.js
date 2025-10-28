import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { IoCloseSharp } from "react-icons/io5";

const NavBar = () => {
    const userData = JSON.parse(localStorage.getItem("user"))

    const firstLetterName = userData?.name[0]
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div>
            <nav className="navbar navbar-container bg-color-linear navbar-expand-lg d-flex justify-content-between align-items-center px-5">

                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    <IoReorderThreeOutline size={30} />
                </div>

                <div className="d-flex justidy-content-center align-items-center">
                    <div className="rounded-5">
                        <img src={logo} alt="logo" width="40" height="40" className="me-2" />
                    </div>
                    <div>
                        <p>Ecommerce Website</p>
                    </div>
                </div>
                <div className={`nav-links gap-4 d-flex ${menuOpen ? "show" : ""}`}>
                    <span onClick={() => setMenuOpen(false)} className="text-end hide-lg"><IoCloseSharp size={"20"} /></span>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 hide-lg ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        My Profile
                    </NavLink>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        About Us
                    </NavLink>
                    {userData.isAdmin && <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Admin Page
                    </NavLink>
                    }
                </div>

                <Link to="/profile" className="text-decoration-none profile-name bg-color d-block rounded-5 d-flex justify-content-center align-items-center text-black">
                    <div >
                        <h4>{firstLetterName}</h4>
                    </div>
                </Link>

            </nav>
        </div>

    )
}

export default NavBar