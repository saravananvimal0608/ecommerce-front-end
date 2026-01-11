import { useParams } from 'react-router-dom';
import { apiRequest } from '../common/common.js'
import { toast } from 'react-toastify'
import { FaShoppingBag } from "react-icons/fa";
import { useEffect, useState } from 'react'
import SwiperComponent from '../components/Swipper'
import defaultimg from '../assets/defaultimg.png'

const SingleProduct = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [allData, setAllData] = useState([])
    const cartData = { productId: data._id, quantity: 1 }
    const BASE_URL = process.env.REACT_APP_BASE_URL

    const fetchRelatedData = async () => {
        try {
            const res = await apiRequest("/product/")
            setAllData(res.data)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }
    // get a single data 
    const fetchData = async () => {
        if (id) {
            try {
                const res = await apiRequest(`/product/singleproduct/${id}`)
                console.log(res.data);

                setData(res.data)
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await apiRequest("/cart/add", "POST", cartData)
            toast.success(res.message);
        } catch (error) {

            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        fetchData()
        fetchRelatedData()
    }, [id])

    return (
        <div className="container position-relative" style={{backgroundColor: '#3E2F5B', minHeight: '100vh'}}>
            <div className="row mt-5 justify-content-center">
                <div className="col-lg-10 pt-3 pt-xl-0">
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
                            <div className="p-3 w-100 text-center" style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '15px', border: '2px solid #E94560'}}>
                                <img
                                    src={data?.image ? data.image : defaultimg}
                                    alt={data?.name}
                                    className="img-fluid rounded-5"
                                    style={{ maxHeight: "400px", objectFit: "contain" }}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 mt-md-3">
                            <div className="px-3">
                                <h3 className="fw-bold para-description text-white">{data?.name}</h3>
                                <h4 className="py-2 color-text fw-bold">₹ {data?.price}</h4>
                                <p className="para-description text-white"><b>Description: </b> {data?.description}</p>
                                <p className="para-description text-white"><b>Category: </b>{data?.category?.name ? (data?.category?.name) : "no category"}</p>
                                <p className="para-description text-white"><b>Brand: </b> {data?.brand}</p>
                                <p className="para-description text-white"><b>Stocks: </b> {data?.stock}</p>
                                <button className="btn btn-background-color mt-3 px-4 py-2 d-flex align-items-center gap-2 text-white fw-bold" onClick={handleSubmit} style={{borderRadius: '25px', transition: 'all 0.3s ease'}}>
                                    <FaShoppingBag color="white" size={18} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-color-linear my-5">
                <h4 className="text-center p-3 fw-bold text-white">Related Products</h4>
            </div>
            <SwiperComponent product={allData} />
            <div className="mt-5">
                <p>:&nbsp;</p>
            </div>
        </div>
    );
}

export default SingleProduct