import { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col, Container, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiRequest } from './../common/common';

const Address = () => {
  const [deleteId, setDeleteId] = useState(null)
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [Delete, setDelete] = useState(false)
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [address, setAddress] = useState(null);
  const [editId, setEditId] = useState(null);

  // Fetch single user's address
  const fetchAddress = async () => {
    try {
      const res = await apiRequest("/address/", "GET")
      setAddress(res.data?.[0] || null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await apiRequest(`/address/${editId}`, "PUT", formData)
        toast.success(res.message);
      } else {
        const res = await apiRequest(`/address`, "POST", formData)
        toast.success(res.message);
      }

      setFormData({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      });
      setEditId(null);
      fetchAddress();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving address");
    }
  };

  const handleEdit = () => {
    if (address) {
      setFormData(address);
      setEditId(address._id);
    }
  };

  const deleteMethod = (id) => {
    setDeleteId(id)
    setDelete(true)
  }

  // Delete address
  const handleDelete = async () => {
    try {
      const res = await apiRequest(`/address/${deleteId}`, "delete")
      toast.success(res.message);
      setDelete(false)
      setAddress(null);
      setFormData({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting address");
    }
  };

  // 🔹 Popup for order confirmation
  const popupModel = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate("/");
    }, 5000);
  };

  return (
    <>      {/* delete popup */}
      {Delete && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center model-popup">
          <div className="modal-content w-25 text-center  border-2 border-dark rounded-4 p-3 bg-white">
            <div className="modal-header border-0 d-flex justify-content-center">
              <h5 className="modal-title fw-bold fs-4">Delete Category</h5>
              <button
                type="button"
                className="btn-close position-absolute end-0 me-3 mt-2"
                onClick={() => setDelete(false)}
              ></button>
            </div>

            <div className="modal-body">
              <p className="fs-6 text-secondary">Are you sure you want to Delete this category?</p>
            </div>

            <div className="modal-footer border-0 d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() => setDelete(false)}
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger px-4" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Container fluid className="d-flex justify-content-center mt-5 pb-3 vh-100">
        <Row className="w-100 mt-5 mt-xl-0">
          <Col md={6} className="mx-auto">
            <Card className="p-4 shadow-sm rounded-3">
              <h4 className="mb-3 text-center">
                {address ? "Saved Address" : "Add New Address"}
              </h4>

              {/* Show form if no address or editing */}
              {!address || editId ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      placeholder="Enter address line 1"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      placeholder="Enter address line 2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter country"
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100 bg-color border-0">
                    {editId ? "Update Address" : "Add Address"}
                  </Button>
                </Form>
              ) : (
                <>
                  <Card className="p-3 shadow-sm mt-3">
                    <Card.Body>
                      <h6 className="fw-bold">{address.addressLine1}</h6>
                      <p className="mb-1">{address.addressLine2}</p>
                      <p className="mb-1">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="mb-2 text-muted">{address.country}</p>

                      <div className="d-flex justify-content-between flex-wrap gap-3">
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={handleEdit}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteMethod(address._id)}
                          >
                            Delete
                          </Button>
                        </div>

                        <Button
                          className="bg-color border-0 text-black"
                          size="sm"
                          onClick={popupModel} 
                        >
                          Order Now
                        </Button>
                      </div>

                      <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        centered
                        backdrop="static"
                      >
                        <Modal.Body className="text-center py-4">
                          <h5 className="text-success fw-bold mb-3">
                            🎉 Order Successful!
                          </h5>
                          <p className="text-b-black">Your order has been placed successfully.</p>
                          <p className="text-b-black">
                            Redirecting to home page in 5 seconds...
                          </p>
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Address;
