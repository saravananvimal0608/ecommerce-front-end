
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from '../components/Footer'

const Layout = () => {
    const location = useLocation();
    const hideFooter = location.pathname.startsWith("/editprofile/");
    return (
        <div >
            <NavBar />
            <div>
                <Outlet />
            </div>
            {!hideFooter && <Footer />}
        </div>
    )
}

export default Layout