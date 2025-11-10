import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../common/common.js";
import defaultimg from '../../assets/defaultimg.png'

const AddProduct = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        brand: "",
        image: null,
    });
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const { id } = useParams();

    // Validation
    const handleErrors = () => {
        const tempErrors = {};
        if (!data.name) tempErrors.name = "* name is required";
        if (!data.description) tempErrors.description = "* description is required";
        if (!data.price) tempErrors.price = "* price is required";
        if (!data.category) tempErrors.category = "* category is required";
        if (!data.stock) tempErrors.stock = "* stock is required";
        if (!data.brand) tempErrors.brand = "* brand is required";
        setError(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    //  Fetch all categories
    const handleCategoryFetch = async () => {
        try {
            const res = await apiRequest("/category/getallcategory", "GET");
            setCategory(res.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to load categories");
        }
    };

    // Fetch single product (for edit)
    const handleFetchSingleData = async () => {
        try {
            const res = await apiRequest(`/product/singleproduct/${id}`, "GET");
            setData({ ...res.data, category: res?.data?.category?._id });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch product");
            console.error("Single product fetching error:", error);
        }
    };

    //  Submit form (Add / Edit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!handleErrors()) return;

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("category", data.category);
            formData.append("stock", data.stock);
            formData.append("brand", data.brand);
            if (data.image instanceof File) formData.append("image", data.image);

            const endpoint = id ? `/product/${id}` : `/product/`;
            const method = id ? "PUT" : "POST";
            console.log(endpoint);

            const res = await apiRequest(endpoint, method, formData, {
                "Content-Type": "multipart/form-data",
            });

            toast.success(res.message || (id ? "Product updated!" : "Product added!"));
            if (!id) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    stock: "",
                    brand: "",
                    image: null,
                });
                if (fileInputRef.current) fileInputRef.current.value = null;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to save product");
            console.error("Product add/update error:", error);
        }
    };

    //  Input change handler
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    //  On mount + id change
    useEffect(() => {
        handleCategoryFetch();
        if (id) {
            handleFetchSingleData();
        } else {
            setData({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                brand: "",
                image: null,
            });
            if (fileInputRef.current) fileInputRef.current.value = null;
        }
    }, [id]);

    return (
        <div className="d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <h2 className="mt-5 mb-3 text-center fw-bold">
                    {id ? "Edit Product" : "Add Product"}
                </h2>

                <Form className="border p-5 form-container" onSubmit={handleSubmit} >
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            className={error?.name && "input-field-error"}
                            onChange={handleChange}
                            value={data.name}
                        />
                        <span className="red-color">{error?.name}</span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            name="description"
                            className={error?.description && "input-field-error"}
                            onChange={handleChange}
                            value={data.description}
                        />
                        <span className="red-color">{error?.description}</span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            name="price"
                            className={error?.price && "input-field-error"}
                            onChange={handleChange}
                            value={data.price}
                        />
                        <span className="red-color">{error?.price}</span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={data.category}
                            className={error?.category && "input-field-error"}
                            onChange={handleChange}
                        >
                            {!id && <option value="">-- Select Category --</option>}
                            {category.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </Form.Select>
                        <span className="red-color">{error?.category}</span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Stock"
                            name="stock"
                            className={error?.stock && "input-field-error"}
                            onChange={handleChange}
                            value={data.stock}
                        />
                        <span className="red-color">{error?.stock}</span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Brand"
                            name="brand"
                            className={error?.brand && "input-field-error"}
                            onChange={handleChange}
                            value={data.brand}
                        />
                        <span className="red-color">{error?.brand}</span>
                    </Form.Group>

                    <Form.Group className="mb-3 ">
                        <Form.Label className="d-block">Upload Image</Form.Label>
                        <Form.Control
                            className="d-none"
                            type="file"
                            name="image"
                            ref={fileInputRef}
                            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
                        />

                        {!data.image && (
                            <img
                                src={defaultimg}
                                alt="default"
                                width="120"
                                height="120"
                                className="border-3 rounded-5 object-fit-cover pointer"
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                            />
                        )}

                        {data.image instanceof File && (
                            <img
                                src={URL.createObjectURL(data.image)}
                                alt="preview"
                                width="120"
                                height="120"
                                className="border-3 rounded-5 object-fit-cover pointer"
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                            />
                        )}

                        {!(
                            data.image instanceof File
                        ) &&
                            typeof data.image === "string" &&
                            data.image !== "" && (
                                <img
                                    src={`${BASE_URL}/upload/${data.image}?t=${Date.now()}`}
                                    alt="old image"
                                    width="120"
                                    height="120"
                                    className="border-3 rounded-5 object-fit-cover pointer"
                                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                />
                            )}
                    </Form.Group>

                    <Button className="bg-color border-0" type="submit">
                        {id ? "Update" : "Submit"}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddProduct;
