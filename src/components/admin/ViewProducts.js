import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import defaultimg from '../../assets/defaultimg.png'
import { Link } from 'react-router-dom';
import { apiRequest } from '../../common/common.js';
import { BsThreeDotsVertical } from "react-icons/bs";

const ViewProduct = () => {
    const [data, setData] = useState([]);
    const [Delete, setDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    // open delete popup
    const deleteMethod = (id) => {
        setDeleteId(id);
        setDelete(true);
    };

    // delete product
    const handleDelete = async () => {
        try {
            const res = await apiRequest(`/product/${deleteId}`, "DELETE");
            toast.success(res.message);
            setDelete(false);
            handleFetch();
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    // fetch all products
    const handleFetch = async () => {
        try {
            const res = await apiRequest("/product/", "GET");
            setData(res.data);
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <div>
            {/* Delete Popup */}
            {Delete && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center model-popup">
                    <div className="modal-content text-center  border-2 border-dark rounded-4 p-3 bg-white">
                        <div className="modal-header border-0 d-flex justify-content-center">
                            <h5 className="modal-title fw-bold fs-4">Delete Product</h5>
                            <button
                                type="button"
                                className="btn-close position-absolute end-0 me-3 mt-2"
                                onClick={() => setDelete(false)}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <p className="fs-6 text-secondary">Are you sure you want to Delete this Product?</p>
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

            {/* Product Table */}
            <div className="d-flex justify-content-center flex-column w-100 p-3">
                <h2 className="text-center mb-5 fw-bold text-white">All Products</h2>
                <div className="w-100 p-3 border rounded shadow-sm bg-light scroll-bar">
                    <table className="table table-bordered table-hover">
                        <thead className="table-header text-center">
                            <tr>
                                <th>Id</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {data.map((d, index) => (
                                <tr key={d._id || index}>
                                    <td className="align-middle">{index + 1}</td>
                                    <td className="align-middle">
                                        <img
                                            src={d?.image ? d.image : defaultimg}
                                            alt="Product"
                                            width="50"
                                            height="50"
                                            className="rounded"
                                        />
                                    </td>
                                    <td className="align-middle">{d.name}</td>
                                    <td>
                                        <div className="position-relative three-dot-icon">
                                            <BsThreeDotsVertical className="pointer" />
                                            <div className="delete-and-edit-box ">
                                                <p className="m-0 pointer d-flex gap-3 align-items-center" onClick={() => deleteMethod(d._id)}>
                                                    <MdDelete size={20} />
                                                    <span>Delete</span>
                                                </p>
                                                <p className="m-0 pointer">
                                                    <Link
                                                        to={`/admin/editproduct/${d._id}`}
                                                        className="d-flex gap-3 align-items-center text-decoration-none text-black"
                                                    >
                                                        <FaRegEdit size={20} />
                                                        <span>Edit</span>
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
