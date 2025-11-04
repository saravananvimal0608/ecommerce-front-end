import { useState, useEffect } from 'react'
import { apiRequest } from '../../common/common.js'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import defaultimg from '../../assets/defaultimg.png'
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";


const ViewCategory = () => {
    const [data, setData] = useState([])
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [Delete, setDelete] = useState(false)
    const [deleteId, setdeleteId] = useState(null)

    // get a id and open the model popup for delete
    const deleteMethod = (id) => {
        setdeleteId(id)
        setDelete(true)
    }
    // delete function
    const handleDelete = async () => {
        try {
            const res = await apiRequest(`/category/${deleteId}`, "DELETE");
            toast.success(res.message)
            setDelete(false)
            handleFetch()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleFetch = async () => {
        try {
            const res = await apiRequest("/category/getallcategory", "GET");
            setData(res.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        handleFetch()
    }, [])

    return (
        <div>
            {/* delete popup */}
            {Delete && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center model-popup">
                    <div className="modal-content w-25 text-center  border-2 border-dark rounded-4 p-3 bg-white">
                        <div className="modal-header border-0 d-flex justify-content-center">
                            <h5 className="modal-title fw-bold fs-4">Delete Category</h5>
                            <button
                                type="button"
                                className="btn-close position-absolute end-0 me-3 mt-2"
                                onClick={() => setDelete(false)}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <p className="fs-6 text-secondary">Are you sure you want to Delete this category?</p>
                        </div>

                        <div className="modal-footer border-0 d-flex justify-content-center gap-3">
                            <button
                                type="button"
                                className="btn btn-secondary px-4"
                                onClick={() => setDelete(false)}
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger px-4" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="d-flex justify-content-center flex-column w-100  p-3">
                <h2 className="text-center mb-5 fw-bold">All Categories</h2>
                <div className="w-100 p-3 border rounded shadow-sm bg-light scroll-bar">
                    <table className="table table-bordered table-hover">
                        <thead className="table-header text-center">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Category Image</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {data.map((d, index) => (
                                <tr key={d._id || index}>
                                    <td className="align-middle">{index + 1}</td>
                                    <td className="align-middle">
                                        <img
                                            src={d.image ? `${BASE_URL}/upload/${d.image}` : defaultimg}
                                            alt="Category"
                                            width="50"
                                            height="50"
                                            className="rounded"
                                        />
                                    </td>
                                    <td className="align-middle">{d.name}</td>
                                    <td className="align-middle text-center position-relative three-dot-icon">
                                        <p className="m-0">
                                            <BsThreeDotsVertical color="black" size={20} />
                                        </p>
                                        <div className="delete-and-edit-box d-flex align-items-center justify-content-center position-absolute border flex-column bg-white p-2 rounded w-50 d-none">
                                            <p className="m-0 d-flex gap-3" onClick={() => deleteMethod(d._id)} >
                                                <MdDelete
                                                    className="pointer mb-2"
                                                    size={20}
                                                />
                                                <span className="pointer">Delete</span>
                                            </p>
                                            <p className="m-0">
                                                <Link to={`/admin/editcategory/${d._id}`}>
                                                    <FaRegEdit className="pointer" size={20} color="black" />
                                                    <span className="pointer text-decoration-none text-black">Edit</span>
                                                </Link>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewCategory