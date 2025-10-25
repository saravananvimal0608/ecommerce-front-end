import { useState, useEffect } from 'react'
import axios from 'axios'
import homeimg from '../assets/home.png'
import puma from '../assets/puma.png'
import adidas from '../assets/adidas.jpg'
import nike from '../assets/nike.jpg'
import skecher from '../assets/skechers.png'
import reebok from '../assets/reebok.png'
import jordan from '../assets/jordan.jpg'
import pumaMain from '../assets/pumaMain.jpg'
import SwiperComponent from '../components/Swipper'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
const Home = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [product, setProduct] = useState([])

    const fetchProducts = async () => {
        const res = await axios.get(`${BASE_URL}/product/`)
        setProduct(res.data.data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    console.log(product);

    return (
        <div className="container mt-5 ">
            <div>
                <img src={homeimg} alt="homeimg" width="100%" height="200px" />
            </div>
            <div className="d-flex flex-wrap gap-3 mt-5 justify-content-center col-12">
                <div className="brandimg">
                    <img src={puma} alt="brandimg" width="200" height="100" />
                </div>
                <div className="brandimg">
                    <img src={adidas} alt="brandimg" width="200" height="100" />
                </div>
                <div className="brandimg">
                    <img src={skecher} alt="brandimg" width="200" height="100" />
                </div>
                <div className="brandimg">
                    <img src={nike} alt="brandimg" width="200" height="100" />
                </div>
                <div className="brandimg">
                    <img src={reebok} alt="brandimg" width="200" height="100" />
                </div>
            </div>
            <div className="mb-5">
                <div className="product-title mt-5">
                    <h4 className="ps-3 p-1 text-center fw-bold">Related Products</h4>
                </div>
                <div className="d-flex flex-wrap gap-5 justify-content-center mt-5 ">
                    {product.slice(0, 10).map((data) => (
                        <div >
                            <Link to={`/product/${data._id}`} className="text-decoration-none text-black">
                                <img src={`${BASE_URL}/upload/${data.image}`} alt={data.name} width="200" height="200" className="dynamic-products p-1" />
                                <h6><b>brand : </b>{data.name}</h6>
                                <p><b>${data.price}</b></p>
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

                <div className="product-title my-5">
                    <h4 className="ps-3 p-1 text-center fw-bold">Offer Products</h4>
                </div>

                <SwiperComponent product={product} />
            </div>
            <Footer />
        </div>
    )
}

export default Home