import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom';

const AddProduct = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [data, setData] = useState({ name: '', description: '', price: '', category: '', stock: '', brand: '', image: null })
    const [category, setCategory] = useState([])
    const fileInputRef = useRef(null);
    const { id } = useParams()

    // for select option show the all categories
    const handleCategoryFetch = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/category/getallcategory`)
            setCategory(res.data.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    // fetch the id data

    const handleFetchSingleData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/product/singleproduct/${id}`)
            setData({ ...res.data.data, category: res.data.data.category._id })
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error?.response?.data?.message, "single product fetching error");
        }
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            //  Create a FormData object to handle both text fields and image upload
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('price', data.price)
            formData.append('category', data.category)
            formData.append('stock', data.stock)
            formData.append('brand', data.brand)
            // Only append image if it's a new File
            if (data.image instanceof File) {
                formData.append('image', data.image)
            }

            const res = id ? await axios.put(`${BASE_URL}/product/${id}`, formData) : await axios.post(`${BASE_URL}/product/`, formData)
            toast.success(res.data.message)
            if (!id) {
                setData({ name: '', description: '', price: '', category: '', stock: '', brand: '', image: null })
                fileInputRef.current.value = null;
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        handleCategoryFetch()
        if (id) {
            handleFetchSingleData();
        }
        // for changing edit page to add page refresh input fields
        else {
            setData({
                name: '',
                description: '',
                price: '',
                category: '',
                stock: '',
                brand: '',
                image: null
            });
            if (fileInputRef.current) fileInputRef.current.value = null;
        }
    }, [id])

    return (
        <div className="d-flex justify-content-center">
            <div>
                <h2 className=" mt-5 mb-3 text-center fw-bold">{id ? "Edit Product" : "Add Product"}</h2>
                <Form className="border p-5 form-container" onSubmit={handlesubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="name" onChange={handleChange} value={data.name} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" name="description" onChange={handleChange} value={data.description} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter Price" name="price" onChange={handleChange} value={data.price} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={data.category}
                            onChange={handleChange}
                        >
                            {!id && <option value="">-- Select Category --</option>}
                            {category.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>

                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" placeholder="Enter Stock" name="stock" onChange={handleChange} value={data.stock} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" placeholder="Enter Brand" name="brand" onChange={handleChange} value={data.brand} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name="image" ref={fileInputRef} onChange={(e) => setData({ ...data, image: e.target.files[0] })} />
                    </Form.Group>
                    <div className="mt-3 text-center">
                        {data.image instanceof File ? (
                            <img
                                src={URL.createObjectURL(data.image)}
                                alt="preview"
                                width="120"
                                height="120"
                                className="border-3 rounded-5 object-fit-cover"
                            />
                        ) : (
                            data.image && (
                                <img
                                    src={`${BASE_URL}/upload/${data.image}`}
                                    alt="old"
                                    width="120"
                                    height="120"
                                    className="border-3 rounded-5 object-fit-cover"
                                />
                            )
                        )}
                    </div>

                    <Button className="bg-color border-0" type="submit">
                        {id ? "Update" : "Submit"}
                    </Button>
                </Form>
            </div>
        </div >
    )
}

export default AddProduct