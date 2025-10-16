import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

const Layout = () => {
    return (
        <div className="d-flex">
            <SideBar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout