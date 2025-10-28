import { useParams } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaShoppingBag } from "react-icons/fa";
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import SwiperComponent from '../components/Swipper'

const SingleProduct = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [allData, setAllData] = useState([])
    const BASE_URL = process.env.REACT_APP_BASE_URL

    const fetchRelatedData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/product/`)
            setAllData(res.data.data)
        } catch (error) {
            toast.error("all data fetched error")
            console.log(error);
        }
    }
    // get a single data 
    const fetchData = async () => {
        if (id) {
            try {
                const res = await axios.get(`${BASE_URL}/product/singleproduct/${id}`)
                setData(res.data.data)
            } catch (error) {
                toast.error(error.response.data)
                console.log(error);
            }
        }
    }
    useEffect(() => {
        fetchData()
        fetchRelatedData()
    }, [id])

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-lg-10">
                    <div className="row align-items-center">
                        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
                            <div className="p-3 w-100 text-center">
                                <img
                                    src={`${BASE_URL}/upload/${data?.image}`}
                                    alt={data?.name}
                                    className="img-fluid"
                                    style={{ maxHeight: "400px", objectFit: "contain" }}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="px-3">
                                <h3 className="fw-bold para-description">{data?.name}</h3>
                                <h4 className="py-2">₹ {data?.price}</h4>
                                <p className="para-description"><b>Description : </b> {data?.description}</p>
                                <p className="para-description"><b>Category : </b>{data?.category?.name ? (data?.category?.name) : "no category"}</p>
                                <p className="para-description"><b>Brand : </b> {data?.brand}</p>
                                <p className="para-description"><b>Stocks :</b> {data?.stock}</p>
                                <button className="btn btn-dark mt-3 px-4 py-2 d-flex align-items-center gap-2">
                                    <FaShoppingBag color="white" size={18} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-color-linear my-5">
                <h4 className="text-center p-1 fw-bold">Related Products</h4>
            </div>
            <SwiperComponent product={allData} />
            <div className="mt-5">
                <p>:&nbsp;</p>
            </div>
            <Footer />
        </div>
    );
}

export default SingleProduct