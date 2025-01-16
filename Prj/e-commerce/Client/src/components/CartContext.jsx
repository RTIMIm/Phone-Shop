import React, { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';

const   CartContext = createContext()

export const useCart =()=> useContext(CartContext)

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id)
            if (existingProduct) {
                Swal.fire({
                    title: 'Added to Cart!',
                    text: `Increased ${product.name} quantity in cart`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                return prevCart.map(item =>
                    item.id === product.id
                        ? {...item, quantity: item.quantity +1 }
                        : item
                )
            }
            Swal.fire({
                title: 'Added to Cart!',
                text: `${product.name} has been added to your cart`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            return [...prevCart, { ...product, quantity:1}]
        })
    }
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
