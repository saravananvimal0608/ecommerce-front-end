import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdOutlinePayment, MdDeliveryDining } from "react-icons/md";
import puma from '../assets/pumashoe-1.jpeg'
import adidas from '../assets/adidasshoe.jpg'
import reebok from '../assets/reebokshoe.jpg'
import Swiper from '../components/Swipper'

const Products = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    // all product fetch
    const handleFetch = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/product/`)
            setProducts(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    // all category fetch 
    const handleCategoryFetch = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/category/getallcategory`)
            setCategory(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetch()
        handleCategoryFetch()
    }, [])
    console.log(products);

    // filtered by category 
    const filteredProducts = selectedCategory
        ? products.filter(
            (product) => product?.category?.name === selectedCategory
        )
        : products

    return (
        <div className="container mt-4 product-wrapper mb-2">
            {/* <input type="text" className="mb-5 rounded-5  w-25 p-2 search-input" placeholder="Search Products" value={searchQuery}
                onChange={handleInputChange} /> */}
            <div className="mb-4 d-flex gap-3 flex-wrap mt-5 mt-xl-0 ps-1 mb-5">
                <h6
                    style={{ cursor: "pointer" }}
                    className={`p-2 rounded-5 ${selectedCategory === "" ? "fw-bold bg-color" : ""}`}
                    onClick={() => setSelectedCategory("")}
                >
                    All Products
                </h6>
                {category.map((cat) => (
                    <div key={cat._id} className={`d-flex align-items-center rounded-5 ${selectedCategory === cat.name ? "fw-bold bg-color" : ""}`}>
                        <img src={`${BASE_URL}/upload/${cat.image}`} width="20" height="20" className="ps-1" />
                        <h6
                            style={{ cursor: "pointer" }}
                            className={`p-2 rounded-5 ${selectedCategory === cat.name ? "fw-bold bg-color" : ""}`}
                            onClick={() => setSelectedCategory(cat.name)}
                        >
                            {cat.name}
                        </h6>
                    </div>
                ))}
            </div>

            <div className="row g-3 mb-5">
                {filteredProducts.length !== 0 ? (
                    filteredProducts.map((data) => (
                        <div key={data._id} className="col-6 col-md-4 col-lg-3 mb-4 text-center g-3">
                            <Link to={`/product/${data._id}`} className="text-decoration-none">
                                <div className="product-img-wrapper p-3 bg-white rounded-3 card">
                                    <img
                                        src={`${BASE_URL}/upload/${data?.image}`}
                                        alt={data.name}
                                        className="img-fluid rounded"
                                        style={{ height: "150px", objectFit: "contain" }}
                                    />
                                    <p className="my-1  text-dark"><b>Name : </b> {data.name}</p>
                                    <p className="my-1 text-dark"><b>Brand : </b> {data.brand}</p>
                                    <p className="text-black mt-1"><b>Price : </b>$<span className="red-color">{data.price}</span></p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-5">
                        <p className="text-muted fs-5">No products found.</p>
                    </div>
                )}
            </div>
            <div className="container my-5">
                <div className="bg-color-linear my-5">
                    <h4 className="text-center p-1 fw-bold">top-rated products</h4>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <img src={puma} alt="puma img" className="card-img-top" width="286" height="286" />
                            <div className="card-body">
                                <h6 className="card-title fw-bold">Best Shoes for Running 2025</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <img src={adidas} alt="adidas img" className="card-img-top" width="286" height="286" />
                            <div className="card-body">
                                <h6 className="card-title fw-bold"> Styling Sneakers with Streetwear</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <img src={reebok} alt="reebok img" className="card-img-top" width="286" height="286" />
                            <div className="card-body">
                                <h6 className="card-title fw-bold"> Reebok classics pair </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-color-linear my-5">
                <h4 className="text-center p-1 fw-bold">Related products</h4>
            </div>
            <Swiper product={products} />

            <div className="container my-5 text-center">
                <div className="row">
                    <div className="col-md-4">
                        <VscWorkspaceTrusted size={"30"} />
                        <p>100% Genuine Products</p>
                    </div>
                    <div className="col-md-4">
                        <MdOutlinePayment size={"30"} />
                        <p>Secure Payments</p>
                    </div>
                    <div className="col-md-4">
                        <MdDeliveryDining size={"30"} />
                        <p>Fast Delivery</p>
                    </div>
                </div>
                <hr />
            </div>

            <Footer />
        </div>
    )
}

export default Products
