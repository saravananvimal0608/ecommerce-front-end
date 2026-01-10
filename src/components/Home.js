import { useState, useEffect } from 'react'
import homeimg from '../assets/home.png'
import puma from '../assets/puma.png'
import adidas from '../assets/adidas.jpg'
import nike from '../assets/nike.jpg'
import skecher from '../assets/skechers.png'
import reebok from '../assets/reebok.png'
import jordan from '../assets/jordan.jpg'
import pumaMain from '../assets/pumaMain.jpg'
import SwiperComponent from '../components/Swipper'
import { Link } from 'react-router-dom'
import { renderStars } from '../common/common.js'
import { apiRequest } from './../common/common';
import defaultimg from '../assets/defaultimg.png'

const Home = () => {
    const [product, setProduct] = useState([])

    const fetchProducts = async () => {
        const res = await apiRequest("/product/", "GET")
        setProduct(res.data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="container mt-xl-5 home-wrapper ">
            <div>
                <img src={homeimg} alt="homeimg" width="100%" height="200px" />
            </div>
            <div className="d-flex flex-wrap gap-3 mt-5 justify-content-center col-12">
                {[puma, adidas, skecher, nike, reebok].map((img, i) => (
                    <div key={i} className="brandimg">
                        <img src={img} alt="brandimg" width="200" height="100" />
                    </div>
                ))}
            </div>

            <div className="mb-5">
                <div className="bg-color-linear mt-5">
                    <h4 className="ps-3 p-1 text-center fw-bold">Related Products</h4>
                </div>
                <div className="d-flex flex-wrap gap-5 justify-content-center mt-5 ">
                    {product.slice(0, 10).map((data) => (
                        <div >
                            <Link to={`/product/${data._id}`} className="text-decoration-none text-black">
                                <img
                                    src={data?.image ? data.image : defaultimg}
                                    alt={data?.name}
                                    width="200"
                                    height="200"
                                    className="dynamic-products p-1"
                                />
                                <h6 className="mt-1"><b>brand : </b>{data.name}</h6>
                                <p className=' mb-1'><b>Price :</b><span className='red-color'> ${data.price}</span></p>
                                <p><b>Rating: </b> <span className="red-color">{renderStars(4)}</span></p>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center gap-4 flex-wrap mt-5">
                    <div className="border banner-single-img p-1">
                        <img src={jordan} alt="jordan" height="400" className="banner-img" />
                    </div>
                    <div className="border banner-single-img p-1">
                        <img src={pumaMain} alt="adidas" height="400" className="banner-img" />
                    </div>
                </div>

                <div className="bg-color-linear my-5">
                    <h4 className="ps-3 p-1 text-center fw-bold">Offer Products</h4>
                </div>

                <SwiperComponent product={product} />
            </div>
        </div>
    )
}

export default Home