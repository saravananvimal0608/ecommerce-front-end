import { useState } from 'react'
import axios from 'axios'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { validate } from "../common/common.js"

const RegisterUser = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [data, setData] = useState({ username: "", email: '', password: '' })
    const [error, setError] = useState({})
    const [togglePassword, setTogglePassword] = useState(false)
    const navigate = useNavigate()


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        
        // validation importing from common.js
        const temperrors = validate(data, "register")
        setError(temperrors)
        if (Object.keys(temperrors).length > 0) {
            return
        }
        try {
            const res = await axios.post(`${BASE_URL}/users`, data)
            navigate("/login")
            toast.success("user registered successfully")
        } catch (error) {
            console.log("user not registered", error);
            toast.error(error.message)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center register-container" >
            <form onSubmit={handlesubmit}>
                <div class="form-group">
                    <label for="name" className="text-white">User Name</label>
                    <input type="text" class="form-control" name="username" value={data.username} onChange={handleChange} />
                    {error.username && <p className="text-danger"><b>{error.username}</b></p>}

                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1" className="text-white">Email address</label>
                    <input type="email" class="form-control" name="email" value={data.email} onChange={handleChange} />
                    {error.email && <p className="text-danger"><b>{error.email}</b></p>}
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1" className="text-white">Password</label>
                    <span className="position-relative"> <input type={togglePassword ? "text" : "password"} className="form-control" name="password" value={data.password} onChange={handleChange} /><span className="password-icon" onClick={() => setTogglePassword(!togglePassword)}> {togglePassword ? <FaEye /> : <FaEyeSlash />}</span></span>
                    {error.password && <p className="text-danger"><b>{error.password}</b></p>}
                </div>
                <button type="submit" class="btn-background-color btn mt-3 text-white">Register</button>
            </form>
        </div>
    )
}
export default RegisterUser