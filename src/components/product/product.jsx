import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, TextField, Snackbar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function Product() {
    const { productid } = useParams(); // Get product ID from URL parameter
    const navigate = useNavigate(); // Hook for navigation back to cart
    const [product, setProduct] = useState(null); // State to hold product data
    const [openSnackbar, setOpenSnackbar] = useState(false); // delete notification
    //formvalues to hold product under consideration
    const [formValues, setFormValues] = useState({
        title: '',
        price: '',
        quantity: ''
    });

    useEffect(() => {
        // Fetch product from local storage
        const storedCart = localStorage.getItem('cart');
        //check if cart has data 
        if (storedCart) {
            const cart = JSON.parse(storedCart);
            //comparing product id with cart items and rendering it
            const foundProduct = cart.find(item => item.id == productid);
            if (foundProduct) {
                setProduct(foundProduct);
                setFormValues({
                    title: foundProduct.title,
                    price: (foundProduct.price * foundProduct.quantity).toFixed(2), // Initialize price
                    quantity: foundProduct.quantity
                });
            } else {
                console.error('Product not found in cart');
            }
        } else {
            console.error('No cart found in local storage');
        }
    }, [productid]);

    //handle changes in quantity 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => {
            const newValues = {
                ...prevValues,
                [name]: value
            };
            // Recalculatig the price if quantity change
            if (name === 'quantity') {
                const updatedQuantity = parseFloat(value) || 0; 
                const updatedPrice = product.price * updatedQuantity;
                newValues.price = updatedPrice.toFixed(2);
            }

            return newValues;
        });
    };
    //for saving changes
    const handleSave = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            let cart = JSON.parse(storedCart);

            cart = cart.map(item =>
                item.id == productid
                    ? { ...item, title: formValues.title, quantity: formValues.quantity, price: parseFloat(formValues.price) }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(cart));
            navigate('/cart');
        }
    };
    //delete product from cart
    const handleDelete = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            let cart = JSON.parse(storedCart);
            cart = cart.filter(item => item.id != productid);
            localStorage.setItem('cart', JSON.stringify(cart));
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/cart');
            }, 1500);
        }
    };
    //notification
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    //loading screen 
    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <Box
            sx={{
                maxWidth: '70vw',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 10,
                gap: 3,
            }}
        >
            <Typography variant='h5' align='left' fontWeight={'bold'}>
                Edit Item
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    gap: 2,
                }}
            >
                <TextField
                    label="Title"
                    variant="outlined"
                    name="title"
                    disabled
                    value={formValues.title}
                    onChange={handleChange}
                    sx={{ flex: 1 }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flex: 1,
                    }}
                >
                    <TextField
                        label="Price"
                        variant="outlined"
                        name="price"
                        value={formValues.price}
                        disabled
                        sx={{ flex: 1 }}
                    />
                    <TextField
                        label="Quantity"
                        variant="outlined"
                        name="quantity"
                        value={formValues.quantity}
                        onChange={handleChange}
                        sx={{ flex: 1 }}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    <Button
                        variant='outlined'
                        onClick={() => navigate('/cart')}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
                <Button
                    variant='outlined'
                    color='error'
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Box>

            {/* Snackbar for delete notification */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
                message="Product removed from cart successfully"
            />
        </Box>
    );
}
