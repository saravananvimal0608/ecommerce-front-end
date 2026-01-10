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
        <div className="min-vh-100" style={{background: '#3E2F5B'}}>
            <div className="container mt-5">
                <h2 className="fw-bold mb-4 text-center pt-4 pt-xl-0" style={{color: 'rgba(255, 255, 255, 0.9)', fontSize: '2.5rem'}}>My Cart</h2>

                {items.length === 0 ? (
                    <div className="text-center mt-5">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            alt="Empty cart"
                            width="150"
                            className="mb-3"
                        />
                        <h5 style={{color: 'rgba(255, 255, 255, 0.9)'}}>Your cart is empty</h5>
                        <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>Add some items to your cart to continue shopping!</p>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            {items
                                .filter((item) => item?.productId)
                                .map((item) => (
                                    <div key={item?.productId?._id} className="card mb-3 shadow-sm border-0 rounded-3" style={{background: '#4a3968', border: '2px solid #E94560'}}>
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
                                                        <h5 className="card-title mb-2 fw-bold" style={{color: 'rgba(255, 255, 255, 0.9)'}}>{item?.productId?.name}</h5>
                                                        <p className="mb-1" style={{color: 'rgba(255, 255, 255, 0.7)'}}>{item?.productId?.category?.name}</p>
                                                        <p className="mb-1 fw-bold" style={{color: '#E94560', fontSize: '1.2rem'}}>
                                                            ₹ {item?.productId?.price * item.quantity}
                                                        </p>
                                                    </div>

                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <button
                                                                className="btn btn-sm"
                                                                style={{
                                                                    background: 'linear-gradient(135deg, #E94560 0%, #ff5a7a 100%)',
                                                                    border: 'none',
                                                                    color: 'white',
                                                                    borderRadius: '6px',
                                                                    width: '35px',
                                                                    height: '35px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontWeight: 'bold'
                                                                }}
                                                                onClick={() =>
                                                                    handleQuantityChange(item?.productId?._id, item?.quantity - 1)
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <span className="fw-bold px-3" style={{color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem'}}>{item.quantity}</span>
                                                            <button
                                                                className="btn btn-sm"
                                                                style={{
                                                                    background: 'linear-gradient(135deg, #E94560 0%, #ff5a7a 100%)',
                                                                    border: 'none',
                                                                    color: 'white',
                                                                    borderRadius: '6px',
                                                                    width: '35px',
                                                                    height: '35px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontWeight: 'bold'
                                                                }}
                                                                onClick={() =>
                                                                    handleQuantityChange(item?.productId?._id, item?.quantity + 1)
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <button
                                                            className="btn btn-link fs-5"
                                                            style={{color: '#E94560', padding: '8px'}}
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

                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 rounded-3 p-4" style={{background: '#4a3968', border: '2px solid #E94560'}}>
                                <h5 className="fw-bold mb-4 text-center" style={{color: 'rgba(255, 255, 255, 0.9)'}}>Order Summary</h5>
                                <div className="d-flex justify-content-between mb-3 p-2" style={{backgroundColor: 'rgba(233, 69, 96, 0.1)', borderRadius: '8px'}}>
                                    <span style={{color: 'rgba(255, 255, 255, 0.7)'}}>Items Total:</span>
                                    <span className="fw-bold" style={{color: '#E94560'}}>₹ {totalAmount}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 p-2">
                                    <span style={{color: 'rgba(255, 255, 255, 0.7)'}}>Delivery Fee:</span>
                                    <span className="text-success fw-bold">Free</span>
                                </div>
                                <hr style={{borderColor: '#E94560', opacity: 0.3}} />
                                <div className="d-flex justify-content-between fw-bold mb-4 p-3" style={{backgroundColor: 'rgba(233, 69, 96, 0.1)', borderRadius: '8px'}}>
                                    <span style={{color: 'rgba(255, 255, 255, 0.9)'}}>Total Amount:</span>
                                    <span style={{color: '#E94560', fontSize: '1.2rem'}}>₹ {totalAmount}</span>
                                </div>
                                <Link to="/address">
                                    <button className="btn w-100 py-3 rounded-3 fw-bold text-uppercase" 
                                            style={{
                                                background: 'linear-gradient(135deg, #E94560 0%, #ff5a7a 100%)',
                                                border: 'none',
                                                color: 'white',
                                                boxShadow: '0 4px 15px rgba(233, 69, 96, 0.3)',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseOver={(e) => {
                                                e.target.style.background = 'linear-gradient(135deg, #d63850 0%, #E94560 100%)';
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 8px 25px rgba(233, 69, 96, 0.4)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.background = 'linear-gradient(135deg, #E94560 0%, #ff5a7a 100%)';
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 4px 15px rgba(233, 69, 96, 0.3)';
                                            }}>
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
