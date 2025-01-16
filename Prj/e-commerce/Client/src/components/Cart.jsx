import React from 'react';
import {useCart} from './CartContext';
import '../styles/App.css';
import Swal from 'sweetalert2';

const Cart = ({ open, onClose }) => {
    const { cart, totalPrice, setCart } = useCart();

    const handleBuy =()=> {
        if (cart.length ===0) {
            Swal.fire({
                title: 'Cart Empty',
                text: 'Please add items to your cart first',
                icon: 'warning'
            })
            return;
        }

        setCart([]);
        Swal.fire({
            title: 'Purchase Successful!',
            text: 'Thank you for your purchase',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
        onClose()
    };

    if (!open) return null;

    return (
        <>
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 999
                }}
                onClick={onClose}
            />
            <div className="cart-dialog">
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="cart-content">
                    {cart.length === 0 ? (
                        <p>No items in the cart</p>
                    ) : (
                        <>
                            {cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <p>{item.name} - ${item.price} x {item.quantity}</p>
                                </div>
                            ))}
                            <div className="cart-total">
                                <p>Total: ${totalPrice.toFixed(2)}</p>
                                <button 
                                    className="buy-button"
                                    onClick={handleBuy}
                                    style={{
                                        backgroundColor: '#1976d2',
                                        color: 'white',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                        width: '100%'
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart; 