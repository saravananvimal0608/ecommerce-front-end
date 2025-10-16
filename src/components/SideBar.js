import { useNavigate, Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const SideBar = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem("token")
        toast.success("successfully logout")
        navigate("/login");
    }

    return (
        <div className="bg-dark text-white col-2">
            <div className="d-flex flex-column justify-content-between h-100 p-3 side-bar-wrapper">
                <div>

                    <Link
                        to="/"
                        className="p-2 text-white text-decoration-none d-block"
                    >
                        <h5 className={`p-2 rounded ${location.pathname === "/" ? "link-border" : ""}`}>
                            Home
                        </h5>
                    </Link>

                    <Link
                        to="/products"
                        className="p-2 text-white text-decoration-none d-block"
                    >
                        <h5 className={`p-2 rounded ${location.pathname === "/products" ? "link-border" : ""}`}>
                            Products
                        </h5>
                    </Link>

                    <Link
                        to="/carts"
                        className="p-2 text-white text-decoration-none d-block"
                    >
                        <h5 className={`p-2 rounded ${location.pathname === "/carts" ? "link-border" : ""}`}>
                            My Cart
                        </h5>
                    </Link>
                </div>

                <div className="p-3">
                    <p className="m-0" onClick={() => handleLogout()}>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar
