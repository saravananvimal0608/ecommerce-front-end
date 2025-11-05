import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiRequest } from './../common/common'
import defaultimg from '../assets/defaultimg.png'

const Products = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [search, setSearch] = useState("")

    // fetch all products
    const handleFetch = async () => {
        try {
            const res = await apiRequest("/product/")
            setProducts(res.data)
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch products")
        }
    }

    // fetch all categories
    const handleCategoryFetch = async () => {
        try {
            const res = await apiRequest("/category/getallcategory")
            setCategory(res.data)
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch categories")
        }
    }

    // highlight matching text
    const highlightText = (text, highlight) => {
        if (!highlight) return text
        const regex = new RegExp(`(${highlight})`, "gi")
        return text.replace(regex, "<mark>$1</mark>")
    }

    const filteredProducts = products.filter((product) => {
        const matchCategory =
            selectedCategory === "" || product?.category?.name === selectedCategory

        const matchSearch =
            search === "" ||
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase())

        return matchCategory && matchSearch
    })

    useEffect(() => {
        handleFetch()
        handleCategoryFetch()
    }, [])

    return (
        <div className="container mt-4 product-wrapper mb-2">
            {/* Search Input */}
            <div className="d-flex justify-content-center mb-4 mt-5 mt-xl-0">
                <input
                    type="text"
                    className="form-control w-50 rounded-5 shadow-sm"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Category filter */}
            <div className="mb-4 d-flex gap-3 flex-wrap ps-1 mb-5">
                <h6
                    className={`p-2 rounded-5 pointer ${selectedCategory === "" ? "fw-bold bg-color" : ""}`}
                    onClick={() => setSelectedCategory("")}
                >
                    All Products
                </h6>
                {category.map((cat) => (
                    <div
                        key={cat._id}
                        className={`d-flex align-items-center rounded-5 ${selectedCategory === cat.name ? "fw-bold bg-color" : ""}`}
                        onClick={() => setSelectedCategory(cat.name)}
                    >
                        <img
                            src={cat.image ? `${BASE_URL}/upload/${cat.image}` : defaultimg}
                            width="20"
                            height="20"
                            className="ps-1"
                        />
                        <h6 className="p-2 rounded-5">{cat.name}</h6>
                    </div>
                ))}
            </div>

            {/* Product list */}
            <div className="row g-3 mb-5">
                {filteredProducts.length !== 0 ? (
                    filteredProducts.map((data) => (
                        <div key={data._id} className="col-6 col-md-4 col-lg-3 mb-4 text-center g-3">
                            <Link to={`/product/${data._id}`} className="text-decoration-none">
                                <div className="product-img-wrapper p-3 bg-white rounded-3 card">
                                    <img
                                        src={data?.image ? `${BASE_URL}/upload/${data?.image}` : defaultimg}
                                        alt={data.name}
                                        className="img-fluid rounded"
                                        style={{ height: "150px", objectFit: "contain" }}
                                        onError={(e) => (e.target.src = defaultimg)}
                                    />
                                    <p
                                        className="my-1 text-dark"
                                        dangerouslySetInnerHTML={{
                                            __html: `<b>Name:</b> ${highlightText(data.name, search)}`
                                        }}
                                    ></p>
                                    <p
                                        className="my-1 text-dark"
                                        dangerouslySetInnerHTML={{
                                            __html: `<b>Brand:</b> ${highlightText(data.brand, search)}`
                                        }}
                                    ></p>
                                    <p className="text-black mt-1">
                                        <b>Price:</b> ₹<span className="red-color">{data.price}</span>
                                    </p>
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
        </div>
    )
}

export default Products
