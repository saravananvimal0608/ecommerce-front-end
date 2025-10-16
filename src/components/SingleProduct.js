import { useParams } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaShoppingBag } from "react-icons/fa";
import { useEffect, useState } from 'react'

const SingleProduct = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const BASE_URL = process.env.REACT_APP_BASE_URL

    // get a single data 
    const fetchData = async () => {
        if (id) {
            try {
                const res = await axios.get(`${BASE_URL}/products/${id}`)
                setData(res.data)
            } catch (error) {
                toast.error(error.response.data)
                console.log(error);
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [id])
    return (
        <div className="vh-100 d-flex col-12 align-items-center justify-content-between w-100">
            <div className="ms-5 col-6 d-flex justify-content-center align-items-center single-product-img-wrapper">
                <div className="bg-color p-4">
                    <img
                        src={data?.image}
                        alt={data?.title}
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                </div>
            </div>
            <div className=" ms-5 d-flex flex-column col-6">
                <div className="ms-5 ">
                    <h3 className="pb-2 fw-bold para-description">{data?.title}</h3>
                    <p className="text-muted mt-2">{data?.category?.toUpperCase()}</p>
                    <h4 className="py-2">₹ {data?.price}</h4>
                    <p className="para-description">{data?.description}</p>


                    <button className="btn btn-dark mt-3 px-4 py-2 d-flex align-items-center gap-2" >
                        <FaShoppingBag color="white" size={18} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div >
    );
}

export default SingleProduct