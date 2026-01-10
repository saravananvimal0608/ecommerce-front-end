import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useRef } from "react";
import { apiRequest } from '../common/common.js'
import defaultimg from '../assets/defaultimg.png'

const ProfilePage = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const fileInputRef = useRef(null)

    // for click the image input tag is open
    const handleInputChange = () => {
        fileInputRef.current.click()
    }

    const handleFetch = async () => {
        try {
            const res = await apiRequest(`/user/getsingleuser/${user._id}`, "GET")
            setData(res.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    const handleProfileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            await apiRequest(`/user/updateimage`, "PUT", formData, { "Content-Type": "multipart/form-data" })

            toast.success("Profile image updated successfully!");
            handleFetch();
        } catch (error) {
            toast.error("Error uploading image");
            console.error(error);
        }
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
                            src={data?.profileImage ? data.profileImage : defaultimg}
                            alt="User"
                            className="rounded-circle mx-auto border border-3 border-color object-fit-cover"
                            width="120"
                            height="120"
                            onClick={handleInputChange}
                        />

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleProfileChange}
                            className="form-control mt-3 d-none"
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

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
