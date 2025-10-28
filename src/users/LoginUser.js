import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'

const LoginUser = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
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
            const res = await axios.post(`${BASE_URL}/user/login`, data)
            setData({ email: '', password: '' })
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data));
            navigate("/")
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center login-container" >
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label className="text-white">Email</label>
                    <input type="text" className="form-control" name="email" value={data?.email} onChange={handleChange} />
                    {error?.email && <span className="text-danger"><b>{error.email}</b></span>}
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1" className="text-white">Password</label>
                    <span className="position-relative"> <input type={togglePassword ? "text" : "password"} className="form-control" name="password" value={data?.password} onChange={handleChange} /><span className="password-icon" onClick={() => setTogglePassword(!togglePassword)}> {togglePassword ? <FaEye /> : <FaEyeSlash />}</span></span>
                    {error?.password && <p className="text-danger"><b>{error?.password}</b></p>}
                </div>
                <div className="d-flex flex-column">
                    <button type="submit" className="btn-background-color btn mt-3 text-white">Login</button>
                    <Link to="/register" className="text-white text-decoration-none">New User ?</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginUser