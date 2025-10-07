import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const RegisterUser = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [data, setData] = useState({ username: '', email: '', password: '' })
    const [error, setError] = useState({})

    // validate errors
    const validate = () => {
        const temperrors = {}

        if (!data.username.trim()) {
            temperrors.username = "username is required"
        }
        if (!data.email.trim()) {
            temperrors.email = "email is required"
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            temperrors.email = "invalid email format"
        }
        if (!data.password) {
            temperrors.password = "password is required"
        }
        else if (data.password.length < 6) {
            temperrors.password = "Password must be at least 6 characters"
        }
        setError(temperrors)
        return Object.keys(temperrors).length === 0
    }



    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()

        if (!validate()) {
            toast.error("please enter all field")
            return
        }
        try {
            const res = await axios.post(`${BASE_URL}/users`, data)
            toast.success("register successfully")
            setData({ username: '', email: '', password: '' })
        } catch (error) {
            console.error("register failed", error);
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
                    {error.email && <small className="text-danger"><b>{error.email}</b></small>}
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1" className="text-white">Password</label>
                    <input type="password" class="form-control" name="password" value={data.password} onChange={handleChange} />
                    {error.password && <small className="text-danger"><b>{error.password}</b></small>}
                </div>
                <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    )
}
export default RegisterUser