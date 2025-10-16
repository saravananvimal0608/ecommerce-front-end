import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { validate } from '../common/common.js'
import { Link, useNavigate } from 'react-router-dom'


const LoginUser = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [data, setData] = useState({ username: 'mor_2314', password: '83r5^_' })
    const [error, setError] = useState({})
    const [togglePassword, setTogglePassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()

        // validation importing from common.js
        const temperrors = validate(data, "login")
        setError(temperrors)
        if (Object.keys(temperrors).length > 0) {
            return
        }

        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, data)
            localStorage.setItem("token", res.data.token)

            navigate("/")
            toast.success("login successfully")
            console.log(res);
        } catch (error) {
            console.log("login failed", error.response.data);
            toast.error(error.response.data)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center login-container" >
            <form onSubmit={handlesubmit}>
                <div class="form-group">
                    <label for="name" className="text-white">User Name</label>
                    <input type="text" class="form-control" name="username" value={data.username} onChange={handleChange} />
                    {error.username && <p className="text-danger"><b>{error.username}</b></p>}

                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1" className="text-white">Password</label>
                    <span className="position-relative"> <input type={togglePassword ? "text" : "password"} className="form-control" name="password" value={data.password} onChange={handleChange} /><span onClick={() => setTogglePassword(!togglePassword)} className="password-icon">{togglePassword ? <FaEye /> : <FaEyeSlash />}</span> </span>
                    {error.password && <p className="text-danger"><b>{error.password}</b></p>}
                </div>
                <div className="d-flex flex-column">
                    <button type="submit" class="btn-background-color btn mt-3 text-white">Login</button>
                    <Link to="/register" className="text-white text-decoration-none">New User ?</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginUser