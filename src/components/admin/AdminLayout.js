import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../admin/AdminNavbar'

const AdminLayout = () => {
    return (
        <div className=" d-flex justify-content-center min-vh-100">
            <div >
                <AdminNavbar />
            </div>

            <div className=" p-4 mt-5 w-100">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout
