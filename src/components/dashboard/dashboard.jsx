import React, { useState, useEffect } from 'react';
import './products.css'; 

export default function ProductDetail() {
    const [products, setProducts] = useState([]); // all products from api
    const [loading, setLoading] = useState(true); //loading status menawhile products are fetching 
    const [error, setError] = useState(null); //error states for product
    const [cart, setCart] = useState([]); //store products to cart 
    //stores questity of products against their id in hash map 
    const [quantity, setQuantity] = useState({});

    //fetch data from fakestoreapi
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setProducts(json);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching product data');
                setLoading(false);
            });
    }, []);

    //updates quantity value
    const handleQuantityChange = (productId, value) => {
        setQuantity(prev => ({ ...prev, [productId]: value }));
    };
    //add products to local storage and cart
    const handleAddToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product && quantity[productId] > 0) {
            const newCartItem = { ...product, quantity: quantity[productId] };
            setCart(prevCart => {
                const updatedCart = [...prevCart, newCartItem];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return updatedCart;
            });
    
            // filter product list by removing product thats added to cart 
            setProducts(prevProducts => {
                const updatedProducts = prevProducts.filter(p => p.id !== productId);
                localStorage.setItem('products', JSON.stringify(updatedProducts));
                return updatedProducts;
            });
            setQuantity(prev => ({ ...prev, [productId]: '' }));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <h2>{product.title}</h2>
                    <p className="product-description">{product.description}</p>
                    <p>Price: ${product.price}</p>
                    {product.image && (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="product-image"
                        />
                    )}
                    <div className="product-action-container">
                        <input
                            type="number"
                            min="1"
                            value={quantity[product.id] || ''}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            className="quantity-input"
                        />
                        <button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={!quantity[product.id]}
                            className="add-to-cart-button"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
