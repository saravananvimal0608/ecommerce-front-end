import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [products, setProducts] = useState([])
    const [active, setActive] = useState("allproducts")
    const handleFetch = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/products`)
            console.log(res.data);
            setProducts(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    // filtering data for categories
    const filteredData = active === "allproducts" ? products : products.filter((product) => product.category === active)

    useEffect(() => {
        handleFetch()
    }, [])
    return (
        <div className="container mt-4 product-wrapper mb-2">
            <div className="mb-4 d-flex gap-3">
                <h6 onClick={() => setActive("allproducts")} className={`p-2 ${active === "allproducts" ? "link-border" : "text-muted"}`}>All Products</h6>
                <h6 onClick={() => setActive("men's clothing")} className={`p-2 ${active === "men's clothing" ? "link-border" : "text-muted"}`}>Mens</h6>
                <h6 onClick={() => setActive("women's clothing")} className={`p-2 ${active === "women's clothing" ? "link-border" : "text-muted"}`}>Womens</h6>
                <h6 onClick={() => setActive("electronics")} className={`p-2 ${active === "electronics" ? "link-border" : "text-muted"}`}>Electronics</h6>
                <h6 onClick={() => setActive("jewelery")} className={`p-2 ${active === "jewelery" ? "link-border" : "text-muted"}`}>Jewelery</h6>
            </div>

            <div className="row g-3" >
                {filteredData.map((data) => (
                    <div key={data.id} className="col-6 col-md-4 col-lg-3 mb-4 text-center g-3">
                        <Link to={`/product/${data.id}`} className="text-decoration-none">
                            <div className="bg-light product-img-wrapper p-3">
                                <img
                                    src={data.image}
                                    alt={data.title}
                                    className="img-fluid rounded"
                                    style={{ height: "150px", objectFit: "contain" }}
                                />
                                <p className="mt-2 text-dark">{data.title}</p>
                                <small className="text-black"><b>$</b>{data.price}</small>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Products