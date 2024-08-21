import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';

export default function Cart() {
    const [cart, setCart] = useState([]); //storing cart data 
    const navigate = useNavigate(); // Hook for navigation to product detail screen

    useEffect(() => {
        // Fetch cart data from local storage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);
    //navigates to product screen
    const handleEditClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div>
            {cart.length === 0 ? (
                <p>No products in cart</p>
            ) : (
                <table className="cart-items">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id}>
                                <td>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{ maxWidth: '100px', height: 'auto' }}
                                        />
                                    )}
                                </td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEditClick(item.id)}
                                    >
                                        Edit Item
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
