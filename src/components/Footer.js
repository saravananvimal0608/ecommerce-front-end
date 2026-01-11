import React from 'react'
import { Link } from 'react-router-dom'
import Mainimg from '../assets/ecommerce-main.webp'

const Footer = () => {
    return (
        <div className="container mb-1" style={{backgroundColor: '#3E2F5B'}}>
            <div className="row gy-4 justify-content-between footer">
                <div className="col-12 col-sm-6 col-md-3 text-sm-start text-center">
                    <img src={Mainimg} alt="main img" width="75" className="mb-2" />
                    <small className="d-block text-white">Ecommerce</small>
                </div>
                <div className="col-12 col-sm-6 col-md-2 text-sm-start text-center">
                    <h5 className="text-white">Visit Link</h5>
                    <Link className="text-decoration-none text-white d-block opacity-75 hover-opacity-100" style={{transition: 'opacity 0.3s ease'}}>Privacy</Link>
                    <Link className="text-decoration-none text-white d-block opacity-75 hover-opacity-100" style={{transition: 'opacity 0.3s ease'}}>Terms & Conditions</Link>
                </div>

                <div className="col-12 col-sm-6 col-md-2 text-sm-start text-center">
                    <h5 className="text-white">Company</h5>
                    <Link className="text-decoration-none text-white d-block opacity-75 hover-opacity-100" style={{transition: 'opacity 0.3s ease'}}>Home Backup</Link>
                    <Link to="/about" className="text-decoration-none text-white d-block opacity-75 hover-opacity-100" style={{transition: 'opacity 0.3s ease'}}>About</Link>
                    <Link className="text-decoration-none text-white d-block opacity-75 hover-opacity-100" style={{transition: 'opacity 0.3s ease'}}>Contact Us</Link>
                </div>

                <div className="col-12 col-sm-6 col-md-2 text-sm-start text-center">
                    <h5 className="text-white">Contact</h5>
                    <Link className="text-decoration-none text-white d-block opacity-75 hover-opacity-100" style={{transition: 'opacity 0.3s ease'}}>Info</Link>
                    <Link className="text-decoration-none text-white d-block opacity-75 hover-opacity-100" style={{transition: 'opacity 0.3s ease'}}>Sales</Link>
                </div>
            </div>

            <hr className="my-4" style={{borderColor: '#E94560', opacity: 0.5}} />

            <div className="text-center">
                <p className="mb-0 text-white opacity-75">© 2025 Ecommerce Website. All rights reserved.</p>
            </div>
        </div>

    )
}

export default Footer