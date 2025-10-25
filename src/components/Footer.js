import React from 'react'
import { Link } from 'react-router-dom'
import Mainimg from '../assets/ecommerce-main.webp'

const Footer = () => {
    return (
        <div className="container mb-1">
            <div className="row gy-4 justify-content-between footer">
                <div className="col-12 col-sm-6 col-md-3 text-sm-start text-center">
                    <img src={Mainimg} alt="main img" width="75" className="mb-2" />
                    <small className="d-block">Ecommerce</small>
                </div>
                <div className="col-12 col-sm-6 col-md-2 text-sm-start text-center">
                    <h5>Visit Link</h5>
                    <Link className="text-decoration-none text-black d-block">Privacy</Link>
                    <Link className="text-decoration-none text-black d-block">Terms & Conditions</Link>
                </div>

                <div className="col-12 col-sm-6 col-md-2 text-sm-start text-center">
                    <h5>Company</h5>
                    <Link className="text-decoration-none text-black d-block">Home Backup</Link>
                    <Link className="text-decoration-none text-black d-block">About</Link>
                    <Link className="text-decoration-none text-black d-block">Contact Us</Link>
                </div>

                <div className="col-12 col-sm-6 col-md-2 text-sm-start text-center">
                    <h5>Contact</h5>
                    <Link className="text-decoration-none text-black d-block">Info</Link>
                    <Link className="text-decoration-none text-black d-block">Sales</Link>
                </div>
            </div>

            <hr className="my-4" />

            <div className="text-center">
                <p className="mb-0">© 2025 Ecommerce Website. All rights reserved.</p>
            </div>
        </div>

    )
}

export default Footer