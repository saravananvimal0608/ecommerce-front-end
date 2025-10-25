import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams, Navigate, useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [data, setData] = useState({ name: "", image: null })
    const fileInputRef = useRef(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const { id } = useParams()
    const navigate = useNavigate()

    const singleDataFetch = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/category/${id}`)
            setData(res.data.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            // for sending image in backend 
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("image", data.image)

            const res = id
                ? await axios.put(`${BASE_URL}/category/update/${id}`, formData)
                : await axios.post(`${BASE_URL}/category/add/category`, formData)
            console.log(res);

            toast.success(id ? "category updated successfully" : "category added successfully")
            id && navigate("/admin/viewcategory")
            if (!id) {
                setData({ name: "", image: null });
                fileInputRef.current.value = null;
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        if (id) {
            singleDataFetch()
        }
    }, [id])

    return (
        <div>
            <h2 className="text-center mb-5">{id ? "Edit Category" : "Add Categories"}</h2>
            <div className="d-flex justify-content-center">

                <form className="form-container p-4" onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label className="mb-3">Category Name</label>
                        <input type="text" className="form-control" name="name" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} value={data.name} />
                    </div>
                    <div className="form-group">
                        <label className="my-3">
                            Category Image</label>
                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
                            {...(!id && { ref: fileInputRef })} />

                        {!(data.image instanceof File) && data.image && (
                            <div className="mt-3 text-center">
                                <img
                                    src={`${BASE_URL}/upload/${data.image}`}
                                    alt="category"
                                    width="120"
                                    height="120"
                                    className="border-3 rounded-5 object-fit-cover"
                                />
                            </div>)}
                    </div>
                    <button type="submit" className="btn bg-color mt-3">{id ? "update" : "Submit"}</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory