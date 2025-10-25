
import { Outlet, useParams } from 'react-router-dom'
import NavBar from './NavBar'

const Layout = () => {
    const {id} = useParams();
    return (
        <div >
            {!id && <NavBar />}
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout