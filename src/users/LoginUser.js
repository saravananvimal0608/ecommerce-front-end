import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from './../common/common';

const LoginUser = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState(null)
    const [togglePassword, setTogglePassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    // validate errors
    const validate = () => {
        const newError = {}
        if (!data.email.trim()) {
            newError.email = "please enter valid email"
        }
        if (!data.password.trim()) {
            newError.password = "enter the password"
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
            const res = await apiRequest("/user/login", "POST", data)
            setData({ email: '', password: '' })
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/")
            toast.success(res.message)
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center login-container" >
            <form onSubmit={handlesubmit} className="p-5 form-box">
                <div className="text-center mb-4">
                    <h3 className=" fw-bold">Welcome Back</h3>
                    <p className=" opacity-75">Sign in to your account</p>
                </div>
                <div className="form-group mb-3">
                    <label className=" fw-semibold mb-2">Email</label>
                    <input type="text" className={`form-control ${error?.email ? 'input-field-error' : ""}`} name="email" value={data?.email} onChange={handleChange} style={{ borderRadius: '8px', padding: '12px' }} />
                    {error?.email && <span className="text-danger"><b>{error.email}</b></span>}
                </div>
                <div className="form-group mb-4">
                    <label className=" fw-semibold mb-2">Password</label>
                    <span className="position-relative">
                        <input type={togglePassword ? "text" : "password"} className={`form-control ${error?.password ? 'input-field-error' : ""}`} name="password" value={data?.password} onChange={handleChange} style={{ borderRadius: '8px', padding: '12px' }} />
                        <span className="password-icon" onClick={() => setTogglePassword(!togglePassword)}>
                            {togglePassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </span>
                    {error?.password && <p className="text-danger"><b>{error?.password}</b></p>}
                </div>
                <div className="d-flex flex-column">
                    <button type="submit" className="btn-background-color btn mt-3 text-white fw-bold py-2" style={{ borderRadius: '25px', transition: 'all 0.3s ease' }}>Login</button>
                    <Link to="/register" className=" text-decoration-none text-center mt-3 opacity-75">New User? Create Account</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginUser