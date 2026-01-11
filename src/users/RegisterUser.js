import { useState, useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../common/common.js'
import { Link } from 'react-router-dom';

const RegisterUser = () => {
    const [data, setData] = useState({ name: "", email: '', number: '', password: '' })
    const [error, setError] = useState({})
    const [togglePassword, setTogglePassword] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const token = localStorage.getItem("token")
    console.log(token);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const validate = () => {
        const newError = {}

        if (!data.name.trim()) {
            newError.name = "please enter name"
        }
        if (!data.email.trim()) {
            newError.email = "please enter email"
        }
        if (!data.number.trim()) {
            newError.number = "please enter number"
        } else if (data.number.length !== 10) {
            newError.number = "please enter 10 digit"
        }
        if (!id) {
            // Registration: password required
            if (!data?.password.trim()) {
                newError.password = "please enter password"
            } else if (data?.password.length < 8) {
                newError.password = "Password must be at least 8 characters"
            }
        } else {
            // Update: password optional
            if (data.password && data.password.length < 8) {
                newError.password = "Password must be at least 8 characters"
            }
        }
        setError(newError)
        return Object.keys(newError).length === 0
    }
    const handlesubmit = async (e) => {
        e.preventDefault()

        if (!validate()) {
            return
        }
        try {
            // removing empty password share to backend
            let payload = { ...data }
            if (id && !data.password) {
                delete payload.password
            }

            const endpoint = id ? `/user/update/${id}` : "/user/register";
            const method = id ? "PUT" : "POST";
            const res = await apiRequest(endpoint, method, payload);
            { id ? navigate("/profile") : navigate("/login") }
            toast.success(id ? "user updated succesfully" : "user registered successfully")
        } catch (error) {
            console.log("user not registered", error);
            toast.error(error.response.data.message)
        }
    }
    // fetching single user for edit
    const singleUser = async () => {
        try {
            const res = await apiRequest(`/user/getsingleuser/${id}`, "GET");
            setData({
                name: res.data.name || "",
                email: res.data.email || "",
                number: res.data.number || "",
                password: ""
            });
        } catch (error) {
            console.log("single data fetching error", error);
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        if (id) { singleUser() }
    }, [id])

    return (
        <div className="d-flex justify-content-center align-items-center register-container" >
            <form onSubmit={handlesubmit} className="p-5 form-box">
                <div className="text-center mb-4">
                    <h3 className="text-white fw-bold">{id ? "Update Profile" : "Create Account"}</h3>
                    <p className="text-white opacity-75">{id ? "Update your information" : "Join our community today"}</p>
                </div>
                <div className="form-group mb-3">
                    <label className="text-white fw-semibold mb-2">Name</label>
                    <input type="text" className={`form-control ${error?.name ? 'input-field-error' : ""}`} name="name" value={data.name} onChange={handleChange} style={{ borderRadius: '8px', padding: '12px' }} />
                    {error.name && <p className="text-danger"><b>{error.name}</b></p>}
                </div>
                <div className="form-group mb-3">
                    <label className="text-white fw-semibold mb-2">Email address</label>
                    <input type="email" className={`form-control ${error?.email ? 'input-field-error' : ""}`} name="email" value={data.email} onChange={handleChange} style={{ borderRadius: '8px', padding: '12px' }} />
                    {error.email && <p className="text-danger"><b>{error.email}</b></p>}
                </div>
                <div className="form-group mb-3">
                    <label className="text-white fw-semibold mb-2">Phone:</label>
                    <input type="text" className={`form-control ${error?.number ? 'input-field-error' : ""}`} name="number" value={data.number} onChange={handleChange} maxLength={10} style={{ borderRadius: '8px', padding: '12px' }} />
                    {error.number && <p className="text-danger"><b>{error.number}</b></p>}
                </div>
                {!id && <div className="form-group mb-4">
                    <label className="text-white fw-semibold mb-2">Password</label>
                    <span className="position-relative">
                        <input type={togglePassword ? "text" : "password"} className={`form-control ${error?.password ? 'input-field-error' : ""}`} placeholder={id ? "enter new password" : ""} name="password" value={data.password} onChange={handleChange} style={{ borderRadius: '8px', padding: '12px' }} />
                        <span className="password-icon password-icon-register" onClick={() => setTogglePassword(!togglePassword)}>
                            {togglePassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </span>
                    {error.password && <p className="text-danger"><b>{error.password}</b></p>}
                </div>}
                <button type="submit" className="btn-background-color btn mt-3 text-white fw-bold py-2 w-100" style={{ borderRadius: '25px', transition: 'all 0.3s ease' }}>{id ? "Update" : "Register"}</button>
                {!id && (
                    <div className="text-center mt-3">
                        <Link to="/login" className="text-white text-decoration-none opacity-75">Already have an account? Sign In</Link>
                    </div>
                )}
            </form>
        </div>
    )
}
export default RegisterUser