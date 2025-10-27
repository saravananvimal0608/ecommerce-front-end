import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import logo from '../../assets/logo.png'
import { IoCloseSharp } from "react-icons/io5";

const AdminNavbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div>
            <nav className="navbar admin-navbar-container navbar-expand-lg navbar-light bg-light d-flex justify-content-between align-items-center px-5">

                <div onClick={() => setMenuOpen(!menuOpen)}>
                    <IoReorderThreeOutline size={30} />
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <div className="rounded-5">
                        <img src={logo} alt="logo" width="40" height="40" className="me-2" />
                    </div>
                    <div>
                        <p>Ecommerce Website</p>
                    </div>
                </div>
                <div className={`admin-nav-links gap-4 d-flex ${menuOpen ? "show" : ""}`}>

                    <span onClick={() => setMenuOpen(false)} className="text-end"><IoCloseSharp size={"20"} /></span>

                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/addcategory"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Add Categories
                    </NavLink>

                    <NavLink
                        to="/admin/viewcategory"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        View Categories
                    </NavLink>

                    <NavLink
                        to="/admin/addproduct"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Add Products
                    </NavLink>
                    <NavLink
                        to="/admin/viewproduct"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        View Products
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
                        to="/profile"
                        className={({ isActive }) =>
                            `text-decoration-none text-black p-2 ${isActive ? "link-border" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Profile
                    </NavLink>
                </div>
            </nav>
        </div>

    )
}

export default AdminNavbar