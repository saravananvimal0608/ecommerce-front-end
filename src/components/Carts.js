import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartItem, updateLocalQuantity, removeCartItem } from "../redux/CartSlice";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import defaultimg from '../assets/defaultimg.png'

const CartPage = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleQuantityChange = (productId, newQty) => {
        if (newQty < 1) return;
        dispatch(updateLocalQuantity({ productId, quantity: newQty }));
        dispatch(updateCartItem({ productId, quantity: newQty }))
            .unwrap()
            .catch(() => {
                toast.error("Update failed, reverting...");
                dispatch(fetchCart());
            });
    };

    const handleRemoveItem = async (productId) => {
        try {
            await dispatch(removeCartItem(productId)).unwrap();
            toast.success("Item removed successfully!");
        } catch (error) {
            toast.error("Failed to remove item");
        }
    };


    if (loading) return <div className="text-center mt-5">🛒 Loading your cart...</div>;
    if (error) {
        toast.error(error);
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    const totalAmount = items.reduce((total, item) => total + (item?.productId?.price || 0) * item.quantity, 0);

    return (
        <div className="bg-light min-vh-100">

            <div className="container mt-5">
                <h2 className="fw-bold mb-4 text-center pt-4 pt-xl-0">My Cart</h2>

                {items.length === 0 ? (
                    <div className="text-center mt-5">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            alt="Empty cart"
                            width="150"
                            className="mb-3"
                        />
                        <h5>Your cart is empty</h5>
                        <p className="text-muted">Add some items to your cart to continue shopping!</p>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            {items
                                .filter((item) => item?.productId)
                                .map((item) => (
                                    <div key={item?.productId?._id} className="card mb-3 shadow-sm border-0 rounded-3">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-md-3 text-center p-3">
                                                <img
                                                    src={item?.productId?.image ? `${item?.productId?.image}` : defaultimg}
                                                    alt={item?.productId?.name}
                                                    className="img-fluid rounded-3"
                                                    style={{ maxHeight: "120px", objectFit: "cover" }}
                                                />
                                            </div>
                                            <div className="col-md-9">
                                                <div className="card-body d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h5 className="card-title mb-2 fw-bold">{item?.productId?.name}</h5>
                                                        <p className="mb-1 text-muted">{item?.productId?.category?.name}</p>
                                                        <p className="mb-1 fw-bold">
                                                            ₹ {item?.productId?.price * item.quantity}
                                                        </p>
                                                    </div>

                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <button
                                                                className="btn btn-outline-dark btn-sm"
                                                                onClick={() =>
                                                                    handleQuantityChange(item?.productId?._id, item?.quantity - 1)
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <span>{item.quantity}</span>
                                                            <button
                                                                className="btn btn-outline-dark btn-sm"
                                                                onClick={() =>
                                                                    handleQuantityChange(item?.productId?._id, item?.quantity + 1)
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <button
                                                            className="btn btn-link text-danger fs-5"
                                                            onClick={() => handleRemoveItem(item?.productId?._id)}
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 rounded-3 p-3">
                                <h5 className="fw-bold mb-3">Order Summary</h5>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Items Total:</span>
                                    <span>₹ {totalAmount}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Delivery Fee:</span>
                                    <span className="text-success">Free</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fw-bold mb-3">
                                    <span>Total Amount:</span>
                                    <span>₹ {totalAmount}</span>
                                </div>
                                <Link to="/address">
                                    <button className="btn btn-dark w-100 py-2 rounded-3" >
                                        Proceed to Checkout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
