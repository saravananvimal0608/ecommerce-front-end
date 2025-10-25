import { useEffect, useState } from 'react';
import profileImg from '../assets/adidas.jpg';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const [data, setData] = useState([])
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const handleFetch = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/getsingleuser/${user._id}`)
            setData(res.data.data)
        } catch (error) {
            console.error("single data fetching error ");
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
    useEffect(() => {
        handleFetch()
    }, [])
    return (
        <div className="container py-5 vh-100 d-flex flex-column justify-content-center my-profile-wrapper">
            <h2 className="text-center color-text fw-bold mb-5 ">My Profile</h2>
            <div className="row justify-content-center">
                <div className="col-12 col-md-4 mb-4">
                    <div className="card text-center p-4 shadow-lg border-0 profile-card">
                        <img
                            src={profileImg}
                            alt="User"
                            className="rounded-circle mx-auto border border-3 border-primary"
                            width="120"
                            height="120"
                        />
                        <h4 className="mt-3 text-dark">{data?.name || "Guest User"}</h4>
                        <p className="text-muted mb-1">{data?.email || "No Email"}</p>
                        <p className="text-muted">{data?.number || "No Number"}</p>

                        <Link to={`/editprofile/${user._id}`}
                            className="btn  mt-3 fw-semibold bg-color"
                        >
                            Edit Profile
                        </Link>
                        <p className="btn fw-semibold bg-color mt-2" onClick={handleLogout}>Logout</p>
                    </div>
                </div>

                <div className="col-12 col-md-8">
                    <div className="card p-4 shadow-lg border-0 profile-details">
                        <h5 className="mb-4 color-text fw-bold">Account Details</h5>

                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Full Name</div>
                            <div className="col-sm-8 text-dark fw-semibold">{data?.name || "N/A"}</div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Email</div>
                            <div className="col-sm-8 text-dark fw-semibold">{data?.email || "N/A"}</div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Phone</div>
                            <div className="col-sm-8 text-dark fw-semibold">{data?.number || "No Number"}</div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Shipping Address</div>
                            <div className="col-sm-8 text-dark fw-semibold">
                                123 Main Street, Chennai, Tamil Nadu 600001
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
