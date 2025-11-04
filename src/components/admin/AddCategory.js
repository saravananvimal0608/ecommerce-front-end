import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { apiRequest } from "../../common/common.js";
import defaultimg from "../../assets/defaultimg.png";

const AddCategory = () => {
    const [data, setData] = useState({ name: "", image: null });
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { id } = useParams();

    //  Validation
    const handleErrors = () => {
        const tempErrors = {};
        if (!data.name) tempErrors.name = "* category name required";
        setError(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    //  Fetch single category (for edit)
    const singleDataFetch = async () => {
        try {
            const res = await apiRequest(`/category/${id}`, "GET");
            setData(res.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch category");
        }
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!handleErrors()) return;

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            if (data.image instanceof File) formData.append("image", data.image);

            const res = id
                ? await apiRequest(`/category/update/${id}`, "PUT", formData, {
                    "Content-Type": "multipart/form-data",
                })
                : await apiRequest(`/category/add/category`, "POST", formData, {
                    "Content-Type": "multipart/form-data",
                });

            toast.success(res.message || (id ? "Category updated!" : "Category added!"));

            if (!id) {
                setData({ name: "", image: null });
                if (fileInputRef.current) fileInputRef.current.value = null;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to save category");
        }
    };

    useEffect(() => {
        if (id) singleDataFetch();
        else setData({ name: "", image: null });
    }, [id]);

    return (
        <div className="d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: "550px" }}>
                <h2 className="text-center mb-4 fw-bold">
                    {id ? "Edit Category" : "Add Category"}
                </h2>

                <Form className="p-4 shadow-sm rounded bg-white" onSubmit={handleSubmit}>
                    {/* Category Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category name"
                            name="name"
                            value={data.name}
                            className={error?.name ? "input-field-error" : ""}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                        />
                        <span className="red-color">{error?.name}</span>
                    </Form.Group>

                    {/* Upload Image */}
                    <Form.Group className="mb-3">
                        <Form.Label className="d-block">Upload Image</Form.Label>

                        <Form.Control
                            className="d-none"
                            type="file"
                            name="image"
                            ref={fileInputRef}
                            onChange={(e) =>
                                setData({ ...data, image: e.target.files[0] })
                            }
                        />

                        {/* Default Image */}
                        {!data.image && (
                            <img
                                src={defaultimg}
                                alt="default"
                                width="120"
                                height="120"
                                className="border-3 rounded-5 object-fit-cover pointer"
                                onClick={() =>
                                    fileInputRef.current && fileInputRef.current.click()
                                }
                            />
                        )}

                        {/* New Uploaded Image */}
                        {data.image instanceof File && (
                            <img
                                src={URL.createObjectURL(data.image)}
                                alt="preview"
                                width="120"
                                height="120"
                                className="border-3 rounded-5 object-fit-cover pointer"
                                onClick={() =>
                                    fileInputRef.current && fileInputRef.current.click()
                                }
                            />
                        )}

                        {/* Old Image (Edit Mode) */}
                        {!(
                            data.image instanceof File
                        ) &&
                            typeof data.image === "string" &&
                            data.image !== "" && (
                                <img
                                    src={`${BASE_URL}/upload/${data.image}`}
                                    alt="old"
                                    width="120"
                                    height="120"
                                    className="border-3 rounded-5 object-fit-cover pointer"
                                    onClick={() =>
                                        fileInputRef.current && fileInputRef.current.click()
                                    }
                                />
                            )}
                    </Form.Group>

                    {/* Submit Button */}
                    <div className=" mt-4">
                        <Button type="submit" className="bg-color border-0 px-4">
                            {id ? "Update" : "Submit"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddCategory;
